const express = require("express");
const router = express.Router();
const userModel = require("../models/userModel");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const bcrypt = require("bcrypt");
require("dotenv").config({ path: "../.env" });

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "2h",
  });
};

function generateRandomString(length = 6) {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters[randomIndex];
  }
  return result;
}

router.post("/register", async (req, res) => {
  const { email } = req.body;

  const existingUser = await userModel.findOne({ email });

  if (existingUser) {
    return res.status(400).send("Email already registered");
  }

  const verificationKey = generateRandomString();
  const hashedKey = await bcrypt.hash(verificationKey, 10);

  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: "Yukis",
    to: email,
    subject: "Підтвердіть свою пошту",
    html: `<h3>Ваш код доступу: ${verificationKey}</h3>`,
  };

  transporter.sendMail(mailOptions);

  res.json({ hashedKey });
});

router.post("/verify-email", async (req, res) => {
  const { email, password, verificationKey, userInputKey } = req.body;

  const isMatch = await bcrypt.compare(userInputKey, verificationKey);

  if (!isMatch) {
    return res.status(400).send("Wrong verification key");
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new userModel({ email, password: hashedPassword });
  await user.save();

  const token = generateToken(user.id);
  res.json({ token });
});

router.get("/status", async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.send({ loggedIn: false, isVerified: false });
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  console.log(decoded);

  const user = await userModel.findById(decoded.id);

  if (user) {
    res.send({ loggedIn: true, isVerified: true, email: user.email, createdAt: user.createdAt });
  } else {
    res.send({ loggedIn: false, isVerified: false });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await userModel.findOne({ email });

  if (!user) {
    return res.status(401).send("Invalid email or password");
  }

  const isMatch = await user.comparePassword(password);

  if (!isMatch) {
    return res.status(401).send("Invalid email or password");
  }

  const token = generateToken(user.id);
  res.json({ token });
});

router.delete("/delete", async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).send("No token provided");
  }

  jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
    if (err) {
      return res.status(401).send("Invalid token");
    }

    try {
      await userModel.findByIdAndDelete(decoded.id);
      res.status(200).send("Profile deleted successfully");
    } catch (error) {
      res.status(500).send("Error deleting profile");
    }
  });
});

module.exports = router;

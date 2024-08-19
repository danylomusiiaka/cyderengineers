const express = require("express");
const router = express.Router();
const userModel = require("../models/userModel");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const bcrypt = require("bcrypt");
require("dotenv").config({ path: "../.env" });

const generateToken = (user) => {
  return jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, {
    expiresIn: "2h",
  });
};

router.post("/register", async (req, res) => {
  const { email, password } = req.body;

  const existingUser = await userModel.findOne({ email });

  if (existingUser) {
    return res.status(400).send("Email already registered");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = new userModel({ email, password: hashedPassword, isVerified: false });
  await user.save();

  const userId = user._id
  const token = generateToken(userId);

  res.json({ token });

  const verificationLink = `http://localhost:5173/email-verification`;

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
    html: `<h3>Підтвердіть свою пошту натиснувши на посилання:</h3><a href="${verificationLink}">Підтвердити пошту</a>`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      return res.status(500).send("Error sending verification email");
    }
    res.status(200).send("Verification email sent");
  });
});

router.get("/verify-email", async (req, res) => {
  const { token } = req.query;

  if (!token) {
    return res.status(400).send("Invalid or missing token");
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.userId;
    console.log(userId);

    const user = await userModel.findOne({ userId });
    console.log(user);

    if (!user) {
      return res.status(400).send("Invalid user");
    }
    user.isVerified = true;
    await user.save();

    res.status(200).send("Email verified successfully!");
  } catch (error) {
    console.log(error);
    return res.status(400).send("Invalid or expired token");
  }
});

router.get("/status", async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.send({ loggedIn: false, isVerified: false });
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const userId = decoded.userId;
  const user = await userModel.findOne({ userId });
  console.log(user);

  if (user.isVerified) {
    res.send({ loggedIn: true, isVerified: true, email: user.email });
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

  const token = generateToken(user);
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

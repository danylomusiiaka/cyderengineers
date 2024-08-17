const express = require("express");
const router = express.Router();
const userModel = require("../models/userModel");
const jwt = require("jsonwebtoken");
require("dotenv").config({ path: "../.env" });

const generateToken = (user) => {
  return jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, {
    expiresIn: "2h",
  });
};

router.post("/adduser", async (req, res) => {
  const { email, password } = req.body;

  const existingUser = await userModel.findOne({ email });

  if (existingUser) {
    return res.status(400).send("Email already registered");
  }

  const user = new userModel({ email, password });
  await user.save();
  const token = generateToken(user);
  res.json({ token });
});

router.get("/status", (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.send({ loggedIn: false });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.send({ loggedIn: false });
    }
    res.send({ loggedIn: true, user: decoded });
  });
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

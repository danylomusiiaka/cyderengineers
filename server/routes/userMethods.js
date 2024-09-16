const express = require("express");
const router = express.Router();
const userModel = require("../models/userModel");
const testModel = require("../models/testModel");
const nodemailer = require("nodemailer");
const bcrypt = require("bcrypt");
const { generateToken, verifyToken, generateRandomString } = require("../config/authMiddleware");
require("dotenv").config({ path: "../.env" });

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

router.get("/status", verifyToken, async (req, res) => {
  try {
    const user = await userModel.findById(req.userId).select({ password: 0, _id: 0, __v: 0 });

    if (user) {
      res.send({ loggedIn: true, user });
    } else {
      res.send({ loggedIn: false });
    }
  } catch (error) {
    res.status(500).send({ loggedIn: false, message: "Error fetching user status" });
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

router.delete("/delete", verifyToken, async (req, res) => {
  try {
    await userModel.findByIdAndDelete(req.userId);
    res.status(200).send("Profile deleted successfully");
  } catch (error) {
    res.status(500).send("Error deleting profile");
  }
});

router.post("/finish_test", async (req, res) => {
  const { testId, email, result } = req.body;

  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).send({ success: false, message: "User not found" });
    }

    const completedTestIndex = user.completed_tests.findIndex(
      (test) => test.testId.valueOf() === testId
    );

    if (completedTestIndex === -1) {
      user.completed_tests.push({ testId, result });
    } else {
      user.completed_tests[completedTestIndex].result = result;
    }

    await user.save();
    res.send({ success: true, message: "Test finished successfully" });
  } catch (error) {
    res.status(500).send({ success: false, message: "Error finishing test", error });
  }
});

router.get("/rating", async (req, res) => {
  try {
    const users = await userModel.find().select("email completed_tests");
    res.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).send("Error fetching users");
  }
});

router.get("/all_completed", verifyToken, async (req, res) => {
  try {
    const user = await userModel.findById(req.userId);

    if (!user) {
      return res.status(404).send({ success: false, message: "User not found" });
    }

    const testIds = user.completed_tests.map((test) => test.testId);

    const tests = await testModel.find({ _id: { $in: testIds } });

    res.status(200).json(tests);
  } catch (error) {
    res.status(500).send("Error fetching completed tests", error.message);
  }
});

module.exports = router;

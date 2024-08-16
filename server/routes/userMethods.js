const express = require("express");
const router = express.Router();
const userModel = require("../models/userModel");

router.post("/adduser", async (req, res) => {
  const { email, password } = req.body;

  const existingUser = await userModel.findOne({ email });

  if (existingUser) {
    return res.status(400).send("Email already registered");
  }

  const user = new userModel({
    email,
    password,
    isLogined: false,
  });

  req.session.user = user;
  await user.save();
  res.send("200 Success");
});

router.get("/adduser", (req, res) => {
  if (req.session.user) {
    res.send({ loggedIn: true, user: req.session.user });
  } else {
    res.send({ loggedIn: false });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await userModel.findOne({ email, password });

  if (!user) {
    return res.status(401).send("Invalid email or password");
  }

  user.isLogined = true;
  req.session.user = user;
  await user.save();
  res.send("200 Success");
});

router.post("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error("Error destroying session:", err);
      return res.status(500).send("Internal Server Error");
    }
    res.clearCookie("userID");
    res.sendStatus(200);
  });
});

module.exports = router;

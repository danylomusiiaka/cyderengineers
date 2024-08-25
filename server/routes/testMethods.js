const express = require("express");
const router = express.Router();
const testModel = require("../models/testModel");
const userModel = require("../models/userModel");
const jwt = require("jsonwebtoken");
const { broadcast } = require("../config/websocket");

router.post("/addtest", async (req, res) => {
  const { name, option, description, author } = req.body;

  const test = new testModel({
    name,
    option,
    description,
    author,
  });

  await test.save();

  broadcast({ type: "add", test });

  res.status(200).send("200 Success");
});

router.get("/", async (req, res) => {
  const tests = await testModel.find({});
  res.status(200).json(tests);
});

router.delete("/deleteByAuthor", async (req, res) => {
  const { authorEmail } = req.body;

  try {
    const result = await testModel.deleteMany({ author: authorEmail });

    broadcast({ type: "deleteAllByAuthor", authorEmail });

    res.status(200).send(`Deleted ${result.deletedCount} tests by author ${authorEmail}`);
  } catch (error) {
    res.status(500).send("Error deleting tests by author");
  }
});

router.delete("/:id", async (req, res) => {
  const testId = req.params.id;
  const deletedTest = await testModel.findByIdAndDelete(testId);

  if (!deletedTest) {
    return res.status(404).send("Test not found");
  }
  await userModel.updateMany({ completed_tests: testId }, { $pull: { completed_tests: testId } });

  broadcast({ type: "delete", testId });

  res.send("Test deleted");
});

router.get("/all-completed", async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).send({ loggedIn: false, message: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await userModel.findById(decoded.id);

    if (!user) {
      return res.status(404).send("User not found");
    }

    const testsId = user.completed_tests;

    if (!Array.isArray(testsId) || testsId.length === 0) {
      return res.status(400).send("Invalid or empty testsId array");
    }

    const tests = await testModel.find({ _id: { $in: testsId } });

    if (tests.length === 0) {
      return res.status(404).send("No tests found for the provided IDs");
    }

    res.status(200).json(tests);
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).send({ loggedIn: false, message: "Token has expired" });
    }
    return res.status(403).send({ loggedIn: false, message: "Invalid token" });
  }
});


module.exports = router;

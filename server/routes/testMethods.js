const express = require("express");
const router = express.Router();
const testModel = require("../models/testModel");
const userModel = require("../models/userModel");
const jwt = require("jsonwebtoken");
const { verifyToken } = require("../config/authMiddleware");
const { broadcast } = require("../config/websocket");

router.post("/addtest", async (req, res) => {
  const { name, category, description, author, picture, questions } = req.body;

  const test = new testModel({
    name,
    category,
    description,
    author,
    picture,
    questions,
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
  await userModel.updateMany(
    { "completed_tests.testId": testId },
    { $pull: { completed_tests: { testId } } }
  );

  broadcast({ type: "delete", testId });

  res.send("Test deleted");
});

router.get("/:id", async (req, res) => {
  const testId = req.params.id;
  const test = await testModel.findById(testId);
  res.json(test);
});

module.exports = router;

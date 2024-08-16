const express = require("express");
const router = express.Router();
const testModel = require("../models/testModel");

router.post("/addtest", async (req, res) => {
  const { name, option, description, author } = req.body;

  const test = new testModel({
    name,
    option,
    description,
    author,
  });

  await test.save();
  res.send("200 Success");
});

router.get("/", async (req, res) => {
  const tests = await testModel.find({});
  res.status(200).json(tests);
});

router.delete("/:id", async (req, res) => {
  const testId = req.params.id;
  const deletedTest = await testModel.findByIdAndDelete(testId);
  if (!deletedTest) {
    return res.status(404).send("Test not found");
  }
  res.send("Test deleted");
});

module.exports = router;

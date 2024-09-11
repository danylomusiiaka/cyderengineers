const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  options: [String],
});

const testSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  picture: {
    type: String,
    required: false,
  },
  questions: [questionSchema],
});

const testModel = mongoose.model("tests", testSchema);

module.exports = testModel;

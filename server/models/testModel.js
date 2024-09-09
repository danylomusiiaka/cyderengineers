const mongoose = require("mongoose");

const testSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  option: {
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
  }
});

const testModel = mongoose.model("tests", testSchema);

module.exports = testModel;

const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { format } = require("date-fns");

const formattedDate = format(new Date(), "dd.MM.yyyy");

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  createdAt: { type: String, default: formattedDate },
  completed_tests: [
    {
      testId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "tests",
        required: true,
      },
      result: {
        type: String,
        default: "",
      },
    },
  ],
});

userSchema.methods.comparePassword = function (password) {
  return bcrypt.compare(password, this.password);
};

module.exports = mongoose.model("User", userSchema);

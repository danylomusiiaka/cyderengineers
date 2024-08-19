const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { format } = require("date-fns");

const formattedDate = format(new Date(), "dd.MM.yyyy");
console.log(formattedDate); // Наприклад: 19.08.2024

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isVerified: { type: Boolean, required: true },
  createdAt: { type: String, default: formattedDate },
});

userSchema.methods.comparePassword = function (password) {
  return bcrypt.compare(password, this.password);
};

module.exports = mongoose.model("User", userSchema);

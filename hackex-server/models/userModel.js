const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter your name."],
      min: [3, "Your name must be greater than 3 characters."],
      max: [20, "Your name must be lesser than 20 characters."],
    },
    email: {
      type: String,
      required: [true, "Please enter your email address."],
      unique: true,
      lowercase: true,
      validate: [validator.isEmail, "Please enter a valid email address."],
    },
    problems: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Problem",
      },
    ],
  },
  { timestamps: true },
);

const User = mongoose.model("User", userSchema);

module.exports = User;

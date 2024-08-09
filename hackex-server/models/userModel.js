const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");

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

    password: {
      type: String,
      required: [true, "Please enter your password."],
      minLength: 8,
      select: false,
    },
    passwordConfirm: {
      type: String,
      required: [true, "Please confirm your password."],
      validate: {
        validator: function (value) {
          return value === this.password;
        },
        message: "Password and confirm password do not match.",
      },
    },
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,
    active: {
      type: Boolean,
      default: true,
      select: false,
    },
  },
  { timestamps: true },
);

userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword,
) {
  const result = await bcrypt.compare(candidatePassword, userPassword);
  return result;
};

userSchema.pre("save", function (next) {
  if (!this.isModified("password") || this.isNew) return next();

  // Saving to the db is a bit slower than issuing jwt ; hence we subtract 1s from here
  this.passwordChangedAt = Date.now() - 1000;
  next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;

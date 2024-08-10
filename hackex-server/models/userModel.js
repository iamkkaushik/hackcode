const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

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

    noOfProblems: {
      type: Number,
      default: 0,
    },

    password: {
      type: String,
      required: [true, "Please enter your password."],
      minLength: 8,
      select: false,
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

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;
  next();
});

userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword,
) {
  const result = await bcrypt.compare(candidatePassword, userPassword);
  return result;
};

const User = mongoose.model("User", userSchema);

module.exports = User;

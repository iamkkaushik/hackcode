const User = require("../models/userModel");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

exports.hello = catchAsync(async (req, res, next) => {
  res.status(200).json({
    status: "success",
    message: "hello",
  });
});

exports.getAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.find({});
  if (!users || users.length === 0) {
    return next(new AppError("No users found. Please try again later", 404));
  }
  res.status(200).json({
    status: "success",
    results: users.length,
    users,
  });
});

exports.submitCode = catchAsync(async (req, res, next) => {
  const { problemId, code, email } = req.body;

  if (!problemId || !code || !email) {
    return next(new AppError("All fields are required", 400));
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return next(new AppError("User not found", 404));
    }

    user.problems.push(problemId);
    user.noOfProblems = user.problems.length;

    await user.save();

    res.status(200).json({ message: "Code submitted successfully." });
  } catch (err) {
    console.error("Error submitting code:", err);
    return next(new AppError("Internal Server Error", 500));
  }
});

exports.userProblems = catchAsync(async (req, res, next) => {
  const { email } = req.body;

  if (!email) {
    return next(new AppError("Email is required", 400));
  }

  try {
    const user = await User.findOne({ email }).populate("problems");

    if (!user) {
      return next(new AppError("User not found", 404));
    }

    res.status(200).json({
      email: user.email,
      noOfProblems: user.noOfProblems,
      problems: user.problems,
    });
  } catch (error) {
    console.error("Error fetching user problems:", error);
    return next(new AppError("Internal Server Error", 500));
  }
});

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
  if (!users) next(new AppError("No users found.Please try again later", 404));
  res.status(200).json({
    status: "success",
    results: users.length,
    users,
  });
});

exports.submitCode = catchAsync(async (req, res, next) => {
  const { problemId, code, email } = req.body;

  try {
    const user = await User.findOne({ email });
    user.problems.push(problemId);
    user.noOfProblems = user.problems.length;

    await user.save();

    res.status(200).json({ message: "Code submitted successfully." });
  } catch (err) {
    console.error("Error submitting code:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

exports.userProblems = catchAsync(async (req, res, next) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: "Email is required" });
  }

  try {
    // Find the user by email and populate the 'problems' field
    const user = await User.findOne({ email }).populate("problems");

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Return the number of problems and the problems themselves
    res.status(200).json({
      email: user.email,
      noOfProblems: user.noOfProblems,
      problems: user.problems,
    });
  } catch (error) {
    console.error("Error fetching user problems:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

exports.getLeaderboard = catchAsync(async (req, res, next) => {
  try {
    // Fetch all users and sort them by noOfProblems in descending order
    const users = await User.find({})
      .sort({ noOfProblems: -1 })
      .select("name noOfProblems");

    // Check if there are users
    if (users.length === 0) {
      return next(new AppError("No users found. Please try again later.", 404));
    }

    res.status(200).json({
      status: "success",
      results: users.length,
      users,
    });
  } catch (error) {
    console.error("Error fetching leaderboard data:", error);
    return next(new AppError("Internal Server Error", 500));
  }
});

exports.getUserData = catchAsync(async (req, res, next) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: "Email is required" });
  }

  try {
    // Find the user by email and populate the 'problems' field
    const user = await User.findOne({ email }).populate("problems");

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Return the number of problems and the problems themselves
    res.status(200).json({
      email: user.email,
      noOfProblems: user.noOfProblems,
      problems: user.problems,
    });
  } catch (error) {
    console.error("Error fetching user problems:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

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
  const { problemId, email } = req.body;

  if (!problemId || !email) {
    return next(new AppError("All fields are required", 400));
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return next(new AppError("User not found", 404));
    }

    // Check if the problem has already been solved by the user
    if (user.problems.includes(problemId)) {
      return res
        .status(200)
        .json({ message: "Problem already solved by the user." });
    }

    // Add the problem ID to the user's list of solved problems
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
    const user = await User.findOne({ email });
    console.log("THIS IS USER ");
    console.log(user);

    if (!user) {
      return next(new AppError("User not found", 404));
    }

    res.status(200).json({
      name: user.name,
      email: user.email,
      noOfProblems: user.noOfProblems,
      problems: user.problems,
      collegeName: user.collegeName,
    });
  } catch (error) {
    console.error("Error fetching user data:", error);
    return next(new AppError("Internal Server Error", 500));
  }
});

exports.getLeaderboard = catchAsync(async (req, res, next) => {
  try {
    // Fetch the top 10 users sorted by noOfProblems in descending order
    const users = await User.find({})
      .sort({ noOfProblems: -1 })
      .select("name noOfProblems")
      .limit(10); // Limit the results to the top 10 users

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

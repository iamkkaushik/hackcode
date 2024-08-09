const Problem = require("../models/problemModel");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

exports.hello = catchAsync(async (req, res, next) => {
  res.status(200).json({
    status: "success",
    message: "hello",
  });
});

exports.getAllProblems = catchAsync(async (req, res, next) => {
  const problems = await Problem.find({});
  if (!problems)
    next(new AppError("No users found.Please try again later", 404));
  res.status(200).json({
    status: "success",
    results: problems.length,
    problems,
  });
});

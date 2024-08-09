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

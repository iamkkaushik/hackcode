const mongoose = require("mongoose");
// const validator = require("validator");

const problemSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please enter the problem title."],
    min: [3, "The title must be greater than 3 characters."],
    max: [50, "The title must be lesser than 50 characters."],
  },
  description: {
    type: String,
    required: [true, "Please enter a description for the problem."],
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "A problem must be associated with a user."],
  },
});

const Problem = mongoose.model("Problem", problemSchema);

module.exports = Problem;

const mongoose = require("mongoose");

const problemSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  constraints: {
    type: String,
    required: true,
  },
  sampleInput: {
    type: String,
    required: true,
  },
  sampleOutput: {
    type: String,
    required: true,
  },
  tag: {
    type: String,
    enum: ["easy", "medium", "hard"],
    default: "easy",
  },
});

const Problem = mongoose.model("Problem", problemSchema);

module.exports = Problem;

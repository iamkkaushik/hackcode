const mongoose = require("mongoose");

const contestSchema = new mongoose.Schema({
  title: String,
  description: String,
  problems: [{ type: mongoose.Schema.Types.ObjectId, ref: "Problem" }],
  startTime: Date,
  endTime: Date,
});
const Contest = mongoose.model("Contest", contestSchema);

module.exports = Contest;

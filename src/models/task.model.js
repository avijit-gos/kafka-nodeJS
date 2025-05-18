/** @format */

const mongoose = require("mongoose");

const TaskSchema = mongoose.Schema(
  {
    _id: { type: mongoose.Schema.Types.ObjectId },
    title: {
      type: String,
      trim: true,
      required: [true, "Task title is required"],
    },
    description: { type: String },
    status: {
      type: String,
      enum: ["active", "pending", "block", "delete"],
      default: "pending",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Task", TaskSchema);

/** @format */

const mongoose = require("mongoose");

const LoggerSchema = mongoose.Schema(
  {
    _id: { type: mongoose.Schema.Types.ObjectId },
    message: {
      type: String,
      trim: true,
      require: [true, "Log message is required"],
    },
    level: {
      type: String,
      enum: ["info", "warn", "error", "debug"], // adjust as needed
      required: true,
    },
    timestamp: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Log", LoggerSchema);

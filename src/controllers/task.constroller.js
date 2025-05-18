/** @format */

const mongoose = require("mongoose");
const Task = require("../models/task.model");
const createError = require("http-errors");
const { kafkaProducer } = require("../kafka/kafka.producer");
const logger = require("../logger");

class TaskController {
  constructor() {}

  async createNewTask(req, res, next) {
    try {
      console.log("Came here...");
      await kafkaProducer("task_topic", req.body, null, 0);
      logger.info("New Task created");
      return res.status(201).json({ message: "Success", status: 201 });
    } catch (error) {
      console.log(error.message);
      logger.error(error.message);
      next(createError.BadRequest(error.message));
    }
  }
}

module.exports = new TaskController();

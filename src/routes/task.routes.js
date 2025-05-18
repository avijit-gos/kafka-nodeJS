/** @format */

const { createNewTask } = require("../controllers/task.constroller");

const router = require("express").Router();

router.post("/", createNewTask);

module.exports = router;

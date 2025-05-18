/** @format */

require("dotenv").config();
const express = require("express");
const cors = require("cors");
const httpError = require("http-errors");
require("./configs/mongoDB.config");
const { connectKafka } = require("./configs/kafka.config");

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

const port = 6001;

app.use("/api/v1/tasks", require("./routes/task.routes"));

// If route not found
app.use(async (req, res, next) => {
  next(createError.NotFound("Page not found"));
});
// Error message
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send({
    error: {
      status: err.status || 500,
      message: err.message,
    },
  });
});

app.listen(port, () => {
  console.log(`Server listening on port:${port}`);
  connectKafka();
});

/** @format */

// logger/index.js
const winston = require("winston");
const KafkaTransport = require("./kafkaTransport");

const customFormat = winston.format.combine(
  winston.format.timestamp(),
  winston.format.printf(({ timestamp, level, message }) => {
    return JSON.stringify({
      message,
      timestamp,
      status: level,
    });
  })
);

const logger = winston.createLogger({
  level: "info",
  format: customFormat,
  transports: [
    new winston.transports.Console(),
    new KafkaTransport({
      topic: "logs_topic",
      partition: 0,
    }),
  ],
});

module.exports = logger;

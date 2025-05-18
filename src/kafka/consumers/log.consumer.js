/** @format */

require("dotenv").config({ path: "../../../.env" });
const { kafka } = require("../../configs/kafka.config");
const mongoose = require("mongoose");
const { DB_URL } = require("../../constants");
const Log = require("../../models/logger.model");

async function connectToMongoDB() {
  try {
    await mongoose.connect(DB_URL);
    console.log("MongoDB: Database is connected");
    mongoose.connection.on("error", (err) =>
      console.error("MongoDB: Database connection error:", err)
    );
    mongoose.connection.on("connected", () =>
      console.log("MongoDB: Database is connected")
    );
  } catch (error) {
    console.error("MongoDB: Error connecting to database:", error);
    process.exit(1); // Exit, because the app cannot run without DB.
  }
}

async function logConsumer() {
  const consumer = kafka.consumer({ groupId: "log-group" });
  try {
    await consumer.connect();
    console.log("logs_topic consumer connected!!!");

    await consumer.subscribe({ topic: "logs_topic", fromBeginning: true });
    console.log("logs_topics subscribes");

    await consumer.run({
      eachMessage: async ({ partition, topic, message }) => {
        const key = message.key?.toString();
        const value = message.value?.toString();
        const parsedKey = key ? JSON.parse(key) : null;
        const parsedValue = value ? JSON.parse(value) : null;

        const newLogData = new Log({
          _id: new mongoose.Types.ObjectId(),
          message: parsedValue.message,
          level: parsedValue.level,
          timestamp: parsedValue.timestamp,
        });
        await newLogData.save();
        console.log("Log data has been saved...");
      },
    });
  } catch (error) {
    console.log(`Error: Could not consume messages from logs_topic topic`);
    await consumer.disconnect();
  }
}

(async () => {
  await connectToMongoDB();
  await logConsumer();
})();

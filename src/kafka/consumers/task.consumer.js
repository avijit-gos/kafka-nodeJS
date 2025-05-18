/** @format */
require("dotenv").config({ path: "../../../.env" });
const { kafka } = require("../../configs/kafka.config");
const mongoose = require("mongoose");
const { DB_URL } = require("../../constants");
const Task = require("../../models/task.model");

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

async function taskConsumer() {
  const consumer = kafka.consumer({ groupId: "task-group" });
  try {
    await consumer.connect();
    console.log("task_topic consumer connected!!!");

    // subscribe topic
    await consumer.subscribe({ topic: "task_topic", fromBeginning: true });
    console.log("Consumer successfully subscribed task_topic topic");

    // read each messages
    await consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        try {
          const key = message.key?.toString();
          const value = message.value?.toString();
          const parsedKey = key ? JSON.parse(key) : null;
          const parsedValue = value ? JSON.parse(value) : null;
          console.log(topic);
          if (topic === "task_topic") {
            const newTask = new Task({
              _id: new mongoose.Types.ObjectId(),
              title: parsedValue.title,
              description: parsedValue.description,
            });
            const data = await newTask.save();
            console.log("Data successfully saved...");
          } else {
            console.log(`Error: Unknown topic:${topic}`);
          }
        } catch (err) {
          console.error("Error while processing message:", err);
        }
      },
    });
  } catch (error) {
    console.log(`Error: Could not consume messages from task_topic topic`);
    await consumer.disconnect();
  }
}

(async () => {
  await connectToMongoDB();
  await taskConsumer();
})();

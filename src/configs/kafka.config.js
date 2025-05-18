/** @format */

const { Kafka } = require("kafkajs");

const kafka = new Kafka({
  clientId: "task",
  brokers: ["localhost:9092"],
});

async function connectKafka() {
  const admin = kafka.admin();
  try {
    await admin.connect();
    console.log("Kafka connected...");
  } catch (error) {
    console.log("Kafka not connected");
    await admin.disconnect();
  }
}

module.exports = { connectKafka, kafka };

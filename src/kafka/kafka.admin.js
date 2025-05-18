/** @format */

const { kafka } = require("../configs/kafka.config");

// create a function to create a TOPIC
async function createTopic(TOPIC_NAME, TOPIC_PARTITION, TOPIC_REPLICATION) {
  const admin = kafka.admin();
  try {
    await admin.connect();
    console.log("Admin connected");
    await admin.createTopics({
      topics: [
        {
          topic: TOPIC_NAME,
          numPartitions: TOPIC_PARTITION,
          replicationFactor: TOPIC_REPLICATION,
        },
      ],
    });
    console.log(`Success:${TOPIC_NAME} topic has been created`);
  } catch (error) {
    console.log(`Error: Could not create the ${TOPIC_NAME} topic..`);
  } finally {
    await admin.disconnect();
  }
}
createTopic("logs_topic", 2, 1);

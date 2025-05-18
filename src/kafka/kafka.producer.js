/** @format */

const { kafka } = require("../configs/kafka.config");

async function kafkaProducer(TOPIC_NAME, MESSAGE, KEY, TOPIC_PARTITION) {
  const producer = kafka.producer();
  try {
    await producer.connect();
    console.log("producer connected");

    // producin message into kafka topic
    const result = await producer.send({
      topic: TOPIC_NAME,
      acks: -1,
      messages: [
        {
          value: JSON.stringify(MESSAGE),
          partition: TOPIC_PARTITION,
          key: KEY || null,
        },
      ],
    });
    if (result) {
      console.log(`Success: Message successfully send to ${TOPIC_NAME} topic`);
    } else {
      console.log(`Error: Message could not send to ${TOPIC_NAME} topic`);
    }
  } catch (error) {
    console.log(error);
    console.log(`Error: Could not produce message to ${TOPIC_NAME} topic.`);
  } finally {
    await producer.disconnect();
  }
}
module.exports = { kafkaProducer };

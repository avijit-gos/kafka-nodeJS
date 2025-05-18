/** @format */

const Transport = require("winston-transport");
const { kafkaProducer } = require("../kafka/kafka.producer");

class KafkaTransport extends Transport {
  constructor(opts) {
    super(opts);
    this.topic = opts.topic || "logs_topic";
    this.partition = opts.partition || 0;
    this.key = opts.key || null;
  }

  // log(info, callback) is called by Winston whenever a log is written.
  async log(info, callback) {
    setImmediate(() => {
      this.emit("logged", info);
    });
    try {
      await kafkaProducer(this.topic, info, this.key, this.partition);
    } catch (err) {
      console.error("Kafka logging failed:", err);
    }
    callback();
  }
}

module.exports = KafkaTransport;

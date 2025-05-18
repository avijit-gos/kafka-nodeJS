<!-- @format -->

# Kafka Task Logger (Node.js + Kafka)

This project demonstrates how to use Apache Kafka with Node.js to produce and store task-related data and logs. It is designed to separate concerns by using different Kafka topics for task events and logs, each processed by dedicated consumers and persisted to a MongoDB database.

---

## 📊 Architecture Overview

Below is the architecture of the system:

![image](https://github.com/user-attachments/assets/694a06ec-8061-407c-b1eb-3f2a2ac5f1d4)


### 🔄 Flow Explanation:

- **Task Producer**: Sends task-related data to the **Task Topic**, which is divided into partitions for scalability.
- **Log Producer**: Sends log data to the **Log Topic**, also partitioned.
- **Task Consumer**: Listens to the Task Topic, processes messages, and stores them into **MongoDB**.
- **Log Consumer**: Listens to the Log Topic, processes logs, and stores them into **MongoDB**.

Kafka ensures that the system remains scalable, decoupled, and fault-tolerant.

---

## 🚀 Features

- Separate producers and consumers for task and log data
- Kafka partitioning for improved performance
- MongoDB storage integration
- Environment-based configuration
- Scalable and maintainable architecture

---

## 🛠️ Tech Stack

- **Node.js**
- **Apache Kafka**
- **MongoDB**
- **kafka-node** (or KafkaJS, based on your setup)
- **dotenv** for environment configuration

---

## 📦 Kafka Installation (macOS using Homebrew)

```bash
# Install Kafka and Zookeeper
brew install kafka

# Start services
brew services start zookeeper
brew services start kafka


# Start Zookeeper and Kafka using Homebrew services
brew services stop kafka
brew services stop zookeeper
```

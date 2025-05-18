/** @format */

const mongoose = require("mongoose");
const { DB_URL } = require("../constants/index");

mongoose.connect(DB_URL);
mongoose.connection.on("error", () => console.log("Database is not connected"));
mongoose.connection.on("connected", () => console.log("Database is connected"));

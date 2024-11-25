const express = require("express");
const router = require("./routes/index");
const Mongoose = require("./connections/index");
const cors = require("cors");

require("dotenv").config();
const SERVER_PORT_NUMBER = process.env.SERVER_PORT_NUMBER;
const MONGODB_CONNECTION_STRING = process.env.MONGODB_CONNECTION_STRING;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

Mongoose(MONGODB_CONNECTION_STRING);

app.use("/", router);

app.listen(SERVER_PORT_NUMBER, () => {
  console.log(`Server started at PORT ${SERVER_PORT_NUMBER}`);
});

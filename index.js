const express = require("express");
const router = require("./routes/index");
const Mongoose = require("./connections/index")

require("dotenv").config();
const PORT = process.env.PORT;
const MONGODB_CONNECTION_STRING = process.env.MONGODB_CONNECTION_STRING;

let app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

Mongoose(MONGODB_CONNECTION_STRING);

app.use("/", router);

app.listen(PORT, ()=>{
    console.log(`Server started at PORT ${PORT}`);
})
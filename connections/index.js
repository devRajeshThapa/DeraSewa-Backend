const mongoose = require("mongoose");

let Mongoose = (MONGODB_CONNECTION_STRING)=>{
    mongoose
    .connect(MONGODB_CONNECTION_STRING)
    .then(()=>{
        console.log("MongoDB connected")
    })
    .catch((err)=>{
        console.log(err);
    });
}

module.exports = Mongoose;
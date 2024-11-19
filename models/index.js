const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    profilePicture: {
        type: String,
        required: false
    },
},
    { timestamps: true }

);

const roomSchema = new mongoose.Schema({
    hosterID: {
        type: String,
        required: true
    },
    hosterPhoneNumber: {
        type: String,
        required: true
    },
    roomCoordinate: {
        type: Array,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    flat: {
        type: Boolean,
    },
    apartment: {
        type: Boolean,
    },
    floorNumber: {
        type: Number,
        required: true
    },
    bedRoomNumber: {
        type: Number,
        required: true
    },
    bathRoom: {
        type: Boolean,
        required: true
    },
    kitchen: {
        type: Boolean,
        required: true
    },
    parking: {
        type: Boolean,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    roomPictures: {
        type: Array,
        required: true
    }
    
},

    { timestamps: true }
);

const verificationSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    OTP: {
        type: Number,
        required: true
    }
})


const userModel = mongoose.model("User", userSchema);
const roomModel = mongoose.model("Room", roomSchema);
const verificationModel = mongoose.model("Verify", verificationSchema)

module.exports = {
    userModel,
    roomModel,
    verificationModel
};
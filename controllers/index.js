let { userModel, roomModel, verificationModel } = require("../models/index");
const registerUser = async(req, res)=>{
    const { firstName, lastName, email, phoneNumber, password } = await req.body
}

module.exports = {
    registerUser,
}
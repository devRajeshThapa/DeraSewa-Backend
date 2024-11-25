const express = require("express");
const router = express.Router();
const {
  userRegisterAuthentication,
  createUserAccount,
  loginUser,
  getUserData,
  deleteUser,
  forgotPasswordAuthentication,
  changeUserPassword,
} = require("../controllers/user");
const { OTPVerification } = require("../controllers/otp");
const { getHosterRoom, hostRoom } = require("../controllers/room");

router
  .post("/user-register-authentication", userRegisterAuthentication)
  .post("/otp-verification", OTPVerification)
  .post("/create-user-account", createUserAccount)
  .post("/login-user", loginUser)
  .get("/get-user-data/:userID", getUserData)
  .delete("/delete-user-account/:userID", deleteUser)
  .post("/forgot-password-authentication", forgotPasswordAuthentication)
  .patch("/change-user-password", changeUserPassword)
  .get("/get-hoster-room/:hosterID", getHosterRoom)
  .post("/host-room", hostRoom)
module.exports = router;

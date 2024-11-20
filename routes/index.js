const express = require("express");
const router = express.Router();
const { userRegisterAuthentication, createUserAccount } = require("../controllers/index");

router
.post("/user-register-authentication", userRegisterAuthentication)
.post("/create-user-account", createUserAccount)

module.exports = router;

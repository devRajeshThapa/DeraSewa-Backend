const { verificationModel } = require("../models");

const generateOTP = async (email) => {
  let OTP = await (Math.floor(Math.random() * 10000) + 10000)
    .toString()
    .substring(1);

  let verification = await verificationModel.create({
    email: `${email}`,
    OTP: `${OTP}`,
  });
};

const getOTP = async (email) => {
  let verify = await verificationModel.find({ email: `${email}` });

  if (verify) {
    return `${verify[verify.length - 1].OTP}`;
  }
};

module.exports = {
  generateOTP,
  getOTP
};

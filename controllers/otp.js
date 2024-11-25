const { verificationModel } = require("../models");

const generateOTP = async (email) => {
  const OTP = await (Math.floor(Math.random() * 10000) + 10000)
    .toString()
    .substring(1);

  const verification = await verificationModel.create({
    email: `${email}`,
    OTP: `${OTP}`,
  });
};

const getOTP = async (email) => {
  const verify = await verificationModel.find({ email: `${email}` });

  if (verify) {
    return `${verify[verify.length - 1].OTP}`;
  }
};

const OTPVerification = async (req, res) => {
  const { email, OTP } = await req.body;
  if (OTP) {
    const userOTP = await getOTP(email);
    if (userOTP == OTP) {
      return res.send({ OTPVerificationStatus: "pass" });
    } else {
      return res.send({ error: "OTP did not matched!" });
    }
  } else {
    return res.json({ error: "Please provide OTP!" });
  }
};

module.exports = {
  generateOTP,
  getOTP,
  OTPVerification
};

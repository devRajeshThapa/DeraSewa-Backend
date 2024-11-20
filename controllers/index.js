const { userModel, roomModel, verificationModel } = require("../models/index");
const { generateOTP, getOTP } = require("./otp");
const { otpMail } = require("./mail");

const userRegisterAuthentication = async (req, res) => {
  const { firstName, lastName, email, phoneNumber, password } = await req.body;

  if (firstName && lastName && email && phoneNumber && password) {
    if (firstName.length >= 3 && lastName.length >= 3) {
      const emailValidator = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

      if (emailValidator.test(email)) {
        const user = await userModel.findOne({ email });

        if (!user) {
          const phoneValidator = /^(\+\d{1,3}[- ]?)?\d{10}$/;

          if (phoneValidator.test(phoneNumber)) {
            const user = await userModel.findOne({ phoneNumber });

            if (!user) {
              if (password.length >= 8) {
                await generateOTP(email);
                const OTP = await getOTP(email);

                const userData = {
                  email: email,
                  firstName: firstName,
                  lastName: lastName,
                };

                await otpMail(userData, OTP);

                return res.json({ authenticationStatus: "pass" });
              } else {
                return res.json({
                  error: "Password string length can't be less than 8!",
                });
              }
            } else {
              return res.json({ error: "Phone number is already registered!" });
            }
          } else {
            return res.json({ error: "Invalid phone number!" });
          }
        } else {
          return res.json({ error: "Email is already registered!" });
        }
      } else {
        return res.json({ error: "Invalid email address!" });
      }
    } else {
      return res.json({
        error: "First Name and Last Name string length can't be less than 3!",
      });
    }
  } else {
    return res.json({ error: "All the input feild must be filled!" });
  }
};

const createUserAccount = async (req, res) => {
  const { firstName, lastName, email, phoneNumber, password } = await req.body;

  const user = await userModel.create({
    firstName,
    lastName,
    email,
    phoneNumber,
    password,
  });

  res.json({ userID: `${user._id}` });
};

module.exports = {
  userRegisterAuthentication,
  createUserAccount,
};

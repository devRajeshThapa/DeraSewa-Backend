const { userModel, roomModel } = require("../models/index");
const { generateOTP, getOTP } = require("./otp");
const {
  registerUserOTPMail,
  accountCreatedNotification,
  loginAlert,
  accountDeletedNotification,
  passwordChangedAlert,
  passwordChangeOTPMail,
} = require("./mail");

const userRegisterAuthentication = async (req, res) => {
  const {
    firstName,
    lastName,
    email,
    phoneNumber,
    password,
    referralCode,
    usingReferral,
  } = await req.body;

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
                if (usingReferral) {
                  if (referralCode) {
                    const referringUser = await userModel.findOne({
                      referralCode,
                    });
                    if (referringUser) {
                      await generateOTP(email);
                      const OTP = await getOTP(email);

                      const userData = {
                        email: email,
                        firstName: firstName,
                        lastName: lastName,
                        OTP: OTP,
                      };

                      await registerUserOTPMail(userData);

                      return res.json({ authenticationStatus: "pass" });
                    } else {
                      return res.json({
                        error: "Referral code did not matched!",
                      });
                    }
                  } else {
                    return res.json({ error: "Please provide referral code!" });
                  }
                } else {
                  await generateOTP(email);
                  const OTP = await getOTP(email);

                  const userData = {
                    email: email,
                    firstName: firstName,
                    lastName: lastName,
                    OTP: OTP,
                  };

                  await registerUserOTPMail(userData);

                  return res.json({ authenticationStatus: "pass" });
                }
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
  const {
    firstName,
    lastName,
    email,
    phoneNumber,
    password,
    referralCode,
    usingReferral,
  } = await req.body;

  function createRandomString(length) {
    const chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }

  const generatedReferralCode = createRandomString(8);

  const user = await userModel.create({
    firstName,
    lastName,
    email,
    phoneNumber,
    password,
    referralCode: generatedReferralCode,
  });

  if (usingReferral) {
    const referringUser = await userModel.findOne({referralCode});
    await userModel.findByIdAndUpdate(referringUser._id, {
      deraCoin: referringUser.deraCoin + 20
    })
    await userModel.findByIdAndUpdate(user._id, {
      deraCoin: user.deraCoin + 300,
    });
  } else {
    await userModel.findByIdAndUpdate(user._id, {
      deraCoin: user.deraCoin + 200,
    });
  }

  const userData = {
    firstName: firstName,
    lastName: lastName,
    email: email,
  };

  accountCreatedNotification(userData);

  return res.json({ userID: `${user._id}` });
};

const loginUser = async (req, res) => {
  const { email, password } = await req.body;

  const user = await userModel.findOne({ email, password });

  if (user) {
    const userData = {
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
    };
    loginAlert(userData);

    return res.json({ userID: `${user._id}` });
  } else if (!email || !password) {
    return res.json({ error: "All the input feild must be filled!" });
  } else {
    return res.json({ error: "Your credentials didn't matched!" });
  }
};

const getUserData = async (req, res) => {
  const userID = await req.params.userID;
  const user = await userModel.findById(userID);
  return res.json(user);
};

const deleteUser = async (req, res) => {
  const userID = await req.params.userID;

  const { password } = await req.body;

  if (password) {
    const user = await userModel.findById(userID);
    if (user.password === password) {
      const userData = {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      };

      await accountDeletedNotification(userData);

      await userModel.findByIdAndDelete(userID);

      const room = await roomModel.find({ hosterID: `${userID}` });

      if (room) {
        const room = await roomModel.deleteMany({ userID: `${userID}` });
      }

      return res.send({ success: "Account delete successfully!" });
    } else {
      return res.json({ error: "Password did not matched!" });
    }
  } else {
    return res.json({ error: "Please provide password!" });
  }
};

const forgotPasswordAuthentication = async (req, res) => {
  const { email, password } = await req.body;

  if (email && password) {
    const user = await userModel.findOne({ email: `${email}` });

    if (user) {
      if (password.length >= 8) {
        await generateOTP(email);
        const OTP = await getOTP(email);
        const userData = {
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          OTP: OTP,
        };
        await passwordChangeOTPMail(userData);
        return res.json({ forgotPasswordAuthenticationStatus: "pass" });
      } else {
        return res.json({
          error: "Password string length can't be less than 8!",
        });
      }
    } else {
      return res.json({ error: "Email does not exist!" });
    }
  } else {
    return res.json({ error: "All the input feild must be filled!" });
  }
};

const changeUserPassword = async (req, res) => {
  const { email, password } = await req.body;
  const user = await userModel.findOneAndUpdate(
    { email: `${email}` },
    {
      password: `${password}`,
    }
  );
  const userData = {
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
  };
  await passwordChangedAlert(userData);

  res.json({ success: "Password changed succesfully!" });
};

module.exports = {
  userRegisterAuthentication,
  createUserAccount,
  loginUser,
  getUserData,
  deleteUser,
  forgotPasswordAuthentication,
  changeUserPassword,
};

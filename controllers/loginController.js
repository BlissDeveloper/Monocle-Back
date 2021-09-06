const auth = require("../firebase/auth");

const User = require("../models/user");

const Validator = require("../validator");
const catchErrors = require("../utils/catchErrors");
const Status = require("../constants/status");

const validateSignIn = [
  Validator.emailValidator,
  Validator.passwordValidator,
  // Validator.adminValidator,
];
const validateForgotPass = [Validator.emailValidator];

const signIn = catchErrors(async (req, res, next) => {
  const signInRes = await auth.signIn(req.body.email, req.body.password);
  let admin = new User(req.body.email, signInRes.data.localId);
  res.cookie("token", signInRes.data.idToken, {
    expire: new Date(253402300000000),
    httpOnly: true,
  });
  res.cookie("refreshToken", signInRes.data.refreshToken, {
    expire: new Date(9999, 12, 31),
    httpOnly: true,
  });
  res.status(200).json({
    status: Status.SUCCESS,
    data: {
      email: admin.email,
      id: admin.id,
      token: signInRes.data.idToken,
      refreshToken: signInRes.data.refreshToken,
    },
  });
});

const forgotPass = catchErrors(async (req, res, next) => {
  await auth.forgotPass(req.body.email);
  res.status(200).json({
    status: Status.SUCCESS,
    data: {
      message: "We have sent a request password to your email.",
    },
  });
});

module.exports = {
  signIn,
  forgotPass,
  validateSignIn,
  validateForgotPass,
};

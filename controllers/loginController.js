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
  console.log("signIn:");
  const signInRes = await auth.signIn(req.body.email, req.body.password);
  console.log("Hello");
  let admin = new User(req.body.email, signInRes.data.localId);
  // let user = new User(req.body.email, signInRes.data.localId);
  res.status(200).json({
    status: Status.SUCCESS,
    data: {
      email: admin.email,
      id: admin.id,
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

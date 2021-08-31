const auth = require("../firebase/auth");
const Validator = require("../validator");

const catchErrors = require("../utils/catchErrors");

const validateSignIn = [Validator.emailValidator, Validator.passwordValidator];
const validateForgotPass = [Validator.emailValidator];

const signIn = catchErrors(async (req, res, next) => {
  await auth.signIn(req.body.email, req.body.password);
  res.status(200).json({
    status: Status.SUCCESS,
    data: {
      email: email,
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

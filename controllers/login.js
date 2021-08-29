const auth = require("../firebase/auth");
const { check } = require("express-validator");
const Status = require("../constants/status");
const ErrorUtils = require("../utils/error-utils");

const validateSignIn = [
  check("email")
    .notEmpty()
    .withMessage("Email is required.")
    .bail()
    .isEmail()
    .withMessage("Invalid email format."),
  check("password")
    .notEmpty()
    .withMessage("Password is required")
    .bail()
    .isLength({ min: 8 })
    .withMessage("Password must be atleast 8 characters"),
];

const validateForgotPass = [
  check("email")
    .notEmpty()
    .withMessage("Email is required.")
    .bail()
    .isEmail()
    .withMessage("Invalid email format."),
];

const signIn = async (req, res) => {
  const errorMsgs = ErrorUtils.handleErrors(req);
  if (errorMsgs.length > 0) {
    res.status(422).json({
      status: Status.FAILED,
      data: {
        message: errorMsgs,
      },
    });
  } else {
    const email = req.body.email;
    const password = req.body.password;
    try {
      await auth.signIn(email, password);
      res.status(200).json({
        status: Status.SUCCESS,
        data: {
          email: email,
        },
      });
    } catch (error) {
      res.status(422).json({
        status: Status.FAILED,
        data: {
          message: [
            error.response.data.error.message
              ? error.response.data.error.message
              : "An unkown error has occurred. Please try again",
          ],
        },
      });
    }
  }
};

const forgotPass = async (req, res) => {
  const errorMessages = ErrorUtils.handleErrors(req);
  if (errorMessages.length > 0) {
    res.status(422).json({
      status: Status.FAILED,
      data: {
        message: errorMessages,
      },
    });
  } else {
    try {
      await auth.forgotPass(req.body.email);
      res.status(200).json({
        status: Status.SUCCESS,
        data: {
          message: "We have sent a request password to your email.",
        },
      });
    } catch (error) {
      res.status(422).json({
        status: Status.FAILED,
        data: {
          message: [
            error.response.data.error.message
              ? error.response.data.error.message
              : "An unkown error has occurred. Please try again",
          ],
        },
      });
    }
  }
};

module.exports = {
  signIn,
  forgotPass,
  validateSignIn,
  validateForgotPass,
};

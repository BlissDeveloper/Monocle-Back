const auth = require("../firebase/auth");
const { check } = require("express-validator");
const { validationResult } = require("express-validator");
const Status = require("../constants/status");

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

const signIn = async (req, res) => {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    const errorMessages = [];
    result.errors.map((error) => {
      errorMessages.push(error.msg);
    });
    res.status(422).json({
      status: Status.FAILED,
      data: {
        message: errorMessages,
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

module.exports = {
  signIn,
  validateSignIn,
};

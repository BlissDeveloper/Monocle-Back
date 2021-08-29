const { check } = require("express-validator");

const emailValidator = check("email")
  .notEmpty()
  .withMessage("Email is required.")
  .bail()
  .isEmail()
  .withMessage("Invalid email format.");

const passwordValidator = check("password")
  .notEmpty()
  .withMessage("Password is required")
  .bail()
  .isLength({ min: 8 })
  .withMessage("Password must be atleast 8 characters");

module.exports = {
  emailValidator,
  passwordValidator,
};

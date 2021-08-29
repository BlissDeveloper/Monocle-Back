const { check, query } = require("express-validator");

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

// const pageValidator = check
//   .query("page")
//   .isNumber()
//   .withMessage("Page must be a number");

// const pageSizeValidator = check
//   .query("size")
//   .isNumber()
//   .withMessage("Page size must be a number");

module.exports = {
  emailValidator,
  passwordValidator,
  // pageValidator,
  // pageSizeValidator,
};

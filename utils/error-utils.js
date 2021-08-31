const { validationResult } = require("express-validator");

const handleErrors = (req) => {
  const result = validationResult(req);
  const errorMessages = [];
  if (!result.isEmpty()) {
    result.errors.map((error) => {
      errorMessages.push(error.msg);
    });
  }
  return errorMessages;
};

module.exports = {
    handleErrors
}

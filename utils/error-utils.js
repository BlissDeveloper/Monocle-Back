const { validationResult } = require("express-validator");

// const result = validationResult(req);
//   if (!result.isEmpty()) {
//     const errorMessages = [];
//     result.errors.map((error) => {
//       errorMessages.push(error.msg);
//     });
//     res.status(422).json({
//       status: Status.FAILED,
//       data: {
//         message: errorMessages,
//       },
//     });

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

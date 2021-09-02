const errorUtils = require("./error-utils");

const AppError = require("./appError");

module.exports = catchErrors = (fn) => {
  return (req, res, next) => {
    const errorMessages = errorUtils.handleErrors(req);
    if (errorMessages.length > 0) {
      next(new AppError(errorMessages.join(","), 400));
    } else {
      fn(req, res, next).catch((error) => {
        next(error);
      });
    }
  };
};

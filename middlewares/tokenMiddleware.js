const catchErrors = require("../utils/catchErrors");
const AppError = require("../utils/appError");

const admin = require("../firebase/admin");

const verifyToken = catchErrors(async (req, res, next) => {
  if (!req.headers.authorization) {
    next(new AppError("No credentials sent", 403));
  }
  const token = req.headers.authorization;
  await admin.verifyToken(token);
  next();
});

module.exports = verifyToken;

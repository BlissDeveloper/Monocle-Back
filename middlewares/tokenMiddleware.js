const catchErrors = require("../utils/catchErrors");
const AppError = require("../utils/appError");

const admin = require("../firebase/admin");

const verifyToken = catchErrors(async (req, res, next) => {
  if (!req.headers.authorization) {
    next(new AppError("No credentials sent", 401));
  } else if (Object.keys(req.headers.authorization).length === 0) {
    next(new AppError("No credentials sent", 401));
  } else {
    try {
      const token = req.headers.authorization.split("Bearer ")[1];
      await admin.verifyToken(token);
      next();
    } catch (error) {
      next(error);
    }
  }
});

module.exports = verifyToken;

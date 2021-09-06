const catchErrors = require("../utils/catchErrors");
const AppError = require("../utils/appError");

const interceptCookie = (req, res, next) => {
  const token = req.cookies.token;
  console.log(req.cookies);
  req.headers.authorization = `Bearer ${token}`;
  console.log(req.headers.authorization);
  next();
};

module.exports = interceptCookie;

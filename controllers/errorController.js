module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";
  let message = "";
  console.log(err.errorInfo.message);
  if (err.response !== null && typeof err.response !== "undefined") {
    message = err.response.data.error.message;
  } else if (err.errorInfo !== null) {
    if (err.errorInfo.message.includes("Firebase ID token has expired")) {
      message = "Token has expired";
      err.statusCode = 401;
    } else {
      message = "Invalid Token";
      err.statusCode = 400;
    }
  }
  res.status(err.statusCode).json({
    status: err.status,
    message: message,
  });
};

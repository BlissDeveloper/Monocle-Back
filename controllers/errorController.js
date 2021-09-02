module.exports = (err, req, res, next) => {
  console.log(err);
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";
  let message = "";
  if (err.response !== null && typeof err.response !== "undefined") {
    message = err.response.data.error.message;
  } else {
    message = err.message;
  }
  res.status(err.statusCode).json({
    status: err.status,
    message: message,
  });
};

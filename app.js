const express = require("express");
const app = express();
const routes = require("./routes/routes");
const fileupload = require("express-fileupload");

const Status = require("./constants/status.js");
const AppError = require("./utils/appError");

//Middlewares
app.use(express.json());
app.use(
  fileupload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

//Routes
app.use("/api/v1", routes);

//404
app.all("*", (req, res, next) => {
  next(new AppError(`Cannot find ${req.originalUrl} on this server!`, 404));
});

//Error handler
app.use((err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
});

module.exports = app;

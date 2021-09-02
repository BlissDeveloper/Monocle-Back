const express = require("express");
const app = express();
const routes = require("./routes/routes");
const fileupload = require("express-fileupload");
const cors = require("cors");

const globalErrorHandler = require("./controllers/errorController");
const uploadMiddleware = require("./middlewares/uploadMiddleware");

const AppError = require("./utils/appError");

//Middlewares
app.use(express.json());
app.use(fileupload());
app.use(uploadMiddleware);
app.use(
  cors({
    origin: "*",
  })
);

//Routes
app.use("/api/v1", routes);

//404
app.all("*", (req, res, next) => {
  next(new AppError(`Cannot find ${req.originalUrl} on this server!`, 404));
});

//Error handler
app.use(globalErrorHandler);

module.exports = app;

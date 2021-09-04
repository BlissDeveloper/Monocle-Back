const express = require("express");
const router = express.Router();

const tokenMiddleware = require("../middlewares/tokenMiddleware");

//Routes
const login = require("./loginRoutes");
const user = require("./userRoutes");
const landmark = require("./landmarkRoutes");
const token = require("./tokenRoute");

router.use("/login", login);
router.use("/token", token);
router.use(tokenMiddleware);
router.use("/user", user);
router.use("/landmark", landmark);

module.exports = router;

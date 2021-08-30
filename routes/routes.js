const express = require("express");
const router = express.Router();

//Routes
const login = require("./loginRoutes");
const user = require("./userRoutes");
const landmark = require("./landmarkRoutes");

router.use("/login", login);
router.use("/user", user);
router.use("/landmark", landmark);

module.exports = router;

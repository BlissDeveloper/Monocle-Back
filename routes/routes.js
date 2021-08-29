const express = require("express");
const router = express.Router();

//Routes
const login = require("./login");
const user = require("./user");

router.use("/login", login);
router.use("/user", user);

module.exports = router;

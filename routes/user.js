const express = require("express");
const router = express.Router();

const controller = require("../controllers/user");

router.post("/add", controller.validateSignUp, controller.addUser);
router.get("/list", controller.getUsersList);

module.exports = router;

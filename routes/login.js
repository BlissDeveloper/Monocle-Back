const express = require("express");
const router = express.Router();
const controller = require("../controllers/login");

router.post("/", controller.validateSignIn, controller.signIn);
router.post(
  "/forgot-password",
  controller.validateForgotPass,
  controller.forgotPass
);

module.exports = router;

const express = require("express");
const router = express.Router();
const controller = require("../controllers/loginController");

router.post("/", controller.validateSignIn, controller.signIn);
router.post(
  "/forgot-password",
  controller.validateForgotPass,
  controller.forgotPass
);

module.exports = router;

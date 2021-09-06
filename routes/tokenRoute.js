const express = require("express");
const router = express.Router();

const controller = require("../controllers/tokenController");

router.get("/", controller.refreshToken);

module.exports = router;

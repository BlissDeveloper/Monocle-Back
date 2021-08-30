const express = require("express");
const router = express.Router();

const controller = require("../controllers/landmarkController");

router.get("/search", controller.validateSearch, controller.search);
router.post("/add", controller.validateLandmark, controller.addLandmark);

module.exports = router;

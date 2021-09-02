const express = require("express");
const router = express.Router();

//Routes
const login = require("./loginRoutes");
const user = require("./userRoutes");
const landmark = require("./landmarkRoutes");

// router.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept"
//   );
// });
router.use("/login", login);
router.use("/user", user);
router.use("/landmark", landmark);

module.exports = router;

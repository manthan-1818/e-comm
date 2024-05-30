const express = require("express");
const router = express.Router();
const userController = require("../controller/usercontroller");

router.post("/signup", userController.signup);
router.post("/login", userController.login);
router.get("/verify/:token", userController.verify);
module.exports = router;
  
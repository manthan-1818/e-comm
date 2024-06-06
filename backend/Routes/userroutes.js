const express = require("express");
const router = express.Router();
const userController = require("../controller/usercontroller");

router.post("/signup", userController.signup);
router.post("/login", userController.login);
router.get("/fetch-userdata", userController.getUserData);
router.patch("/update-userdata", userController.updateData);
router.delete("/delete-userdata", userController.deleteData);
router.get("/verify/:token", userController.verify);
module.exports = router;
  
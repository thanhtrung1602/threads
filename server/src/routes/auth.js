var express = require("express");
var router = express.Router();
const authController = require("../app/controllers/AuthController");
/* GET users listing. */
router.get("/log", authController.getToken);
router.post("/logout", authController.logout);
router.post("/register", authController.register);
router.post("/login", authController.login);

module.exports = router;

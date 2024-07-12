var express = require("express");
var router = express.Router();
const userController = require("../app/controllers/UserController");
const uploadCloud = require("../config/cloudinary");
/* GET users listing. */
router.get("/getCookie", userController.getCookie);
router.get("/getCookieToken", userController.getCookieToken);
router.get("/getFollow/:id", userController.getFollow);
router.get("/getCountFollowing/:id", userController.getCountFollowing);
router.get("/getCountFollower/:id", userController.getCountFollower);
router.delete("/unFollow", userController.unFollow);
router.post("/follow", userController.follow);
router.put(
  "/updateUser/:id",
  uploadCloud.single("image"),
  userController.updateUser
);
router.get("/getMe/:id", userController.getMe);
router.get("/getAllUser", userController.getAllUser);
router.get("/search/", userController.search);
router.get("/", userController.index);
module.exports = router;

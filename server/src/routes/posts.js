var express = require("express");
var router = express.Router();
const postController = require("../app/controllers/PostController");
const uploadCloud = require("../config/cloudinary");
/* GET users listing. */
router.delete("/unLiked", postController.unLiked);
router.get("/getLike/:id", postController.getLike);
router.get("/getCountLike/:id", postController.getCountLike);
router.post("/liked", postController.liked);
router.get("/getOnePost/:id", postController.getOnePost);
router.get("/getAllPostUser/:id", postController.getAllPostUser);
router.get("/getAllPost", postController.getAllPost);
router.delete("/delPost/:id", postController.delPost);
router.get("/getMedia/:id", postController.getMedia);
router.post("/upPost", uploadCloud.array("media", 10), postController.upPost);

module.exports = router;

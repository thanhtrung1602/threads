var express = require("express");
var router = express.Router();
const commentController = require("../app/controllers/CommentController");
const uploadCloud = require("../config/cloudinary");
/* GET users listing. */
router.get("/getCountComment/:id", commentController.getCountComment);
router.get("/getComment/:id", commentController.getComment);
router.post(
  "/postComment",
  uploadCloud.single("media"),
  commentController.postComment
);
router.get("/", commentController.index);

module.exports = router;

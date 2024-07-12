const commentService = require("../../services/commentService");
class CommentController {
  async getCountComment(req, res) {
    const id = req.params.id;
    try {
      const count = await commentService.countComment(id);
      return res.status(200).json(count);
    } catch (error) {
      return res.status(500).json({
        EM: "error message",
        EC: "-1",
        DT: "",
      });
    }
  }
  async getComment(req, res) {
    const id = req.params.id;
    try {
      const getAll = await commentService.getComment(id);
      return res.status(200).json(getAll);
    } catch (error) {
      return res.status(500).json({
        EM: "error message",
        EC: "-1",
        DT: "",
      });
    }
  }
  async postComment(req, res) {
    const file = req.file ? req.file.path : null;
    const { content, user_id, postId } = req.body;
    try {
      if (!user_id) {
        return res.status(500).json("you are not log in");
      }
      const comment = await commentService.comment(req.body, file);
      return res.status(200).json(comment);
    } catch (error) {
      return res.status(500).json({
        EM: "error message",
        EC: "-1",
        DT: "",
      });
    }
  }

  index(req, res) {
    res.send("this is users");
  }
}

module.exports = new CommentController();

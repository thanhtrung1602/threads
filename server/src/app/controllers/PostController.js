const postsService = require("../../services/postsService");
class PostController {
  async unLiked(req, res) {
    const { status, user_id, postId } = req.body;
    try {
      if (!user_id) {
        return res.status(400).json("You are not logged in");
      }
      const liked = await postsService.unLiked(req.body);
      return res.status(200).json(liked);
    } catch (error) {
      return res.status(500).json({
        EM: "error message",
        EC: "-1",
        DT: "",
      });
    }
  }
  async getLike(req, res) {
    const id = req.params.id;
    try {
      const status = await postsService.getStatusLike(id);
      return res.status(200).json(status);
    } catch (error) {
      return res.status(500).json({
        EM: "error message",
        EC: "-1",
        DT: "",
      });
    }
  }
  async getCountLike(req, res) {
    const id = req.params.id;
    try {
      const count = await postsService.getCountLike(id);
      return res.status(200).json(count);
    } catch (error) {
      return res.status(500).json({
        EM: "error message",
        EC: "-1",
        DT: "",
      });
    }
  }
  async liked(req, res) {
    const { status, user_id, postId } = req.body;
    try {
      if (!user_id) {
        return res.status(400).json("You are not logged in");
      }
      const liked = await postsService.liked(req.body);
      return res.status(200).json(liked);
    } catch (error) {
      return res.status(500).json({
        EM: "error message",
        EC: "-1",
        DT: "",
      });
    }
  }
  async getOnePost(req, res) {
    const id = req.params.id;
    try {
      if (!id) {
        return res.status(200).json("don't have post");
      }
      const getOne = await postsService.getOnePost(id);
      return res.status(200).json(getOne);
    } catch (error) {
      return res.status(500).json({
        EM: "error message",
        EC: "-1",
        DT: "",
      });
    }
  }
  async getAllPostUser(req, res) {
    const id = req.params.id;
    try {
      const getPostUser = await postsService.getAllPostUser(id);
      console.log(getPostUser);
      return res.status(200).json(getPostUser);
    } catch (error) {
      return res.status(500).json({
        EM: "error message",
        EC: "-1",
        DT: "",
      });
    }
  }
  async getAllPost(req, res) {
    try {
      const getAll = await postsService.getAllPost();
      return res.status(200).json(getAll);
    } catch (error) {
      return res.status(500).json({
        EM: "error message",
        EC: "-1",
        DT: "",
      });
    }
  }

  // async postImage(req, res) {
  //   const { post_id } = req.body;

  //   try {
  //     const media = await postsService.mediaPost(req.body, files);
  //     return res.status(200).json(media);
  //   } catch (error) {
  //     return res.status(500).json({
  //       EM: "error message",
  //       EC: "-1",
  //       DT: "",
  //     });
  //   }
  // }

  async upPost(req, res) {
    const file = req.file ? req.file.path : null;
    const { content, user_id } = req.body;
    try {
      if (!user_id) {
        return res.status(500).json("you are not log in");
      }
      const upload = await postsService.post(req.body, file);
      return res.status(200).json(upload);
    } catch (error) {
      return res.status(500).json({
        EM: "error message",
        EC: "-1",
        DT: "",
      });
    }
  }

  async delPost(req, res) {
    const id = req.params.id;
    try {
      const del = await postsService.delPost(id);
      return res.status(200).json(del);
    } catch (error) {
      return res.status(500).json({
        EM: "error message",
        EC: "-1",
        DT: "",
      });
    }
  }
}

module.exports = new PostController();

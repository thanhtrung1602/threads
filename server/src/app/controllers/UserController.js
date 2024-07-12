const userService = require("../../services/userService");
const jwt = require("jsonwebtoken");
class UsersController {
  async getCookie(req, res) {}
  getCookieToken(req, res) {
    const { accessToken } = req.cookies;
    if (!accessToken) {
      return res.status(404).json("not found token!");
    }
    console.log(accessToken);
    return res.status(200).json(accessToken);
  }
  async getFollow(req, res) {
    const id = req.params.id;
    try {
      const getFollow = await userService.getFollow(id);
      return res.status(200).json(getFollow);
    } catch (error) {
      return res.status(500).json({
        EM: "error message",
        EC: "-1",
        DT: "",
      });
    }
  }
  async getCountFollowing(req, res) {
    try {
      const countFollowing = await userService.countFollowing(id);
      return res.status(200).json(countFollowing);
    } catch (error) {
      return res.status(500).json({
        EM: "error message",
        EC: "-1",
        DT: "",
      });
    }
  }
  async getCountFollower(req, res) {
    const id = req.params.id;
    try {
      const countFollower = await userService.countFollower(id);
      return res.status(200).json(countFollower);
    } catch (error) {
      return res.status(500).json({
        EM: "error message",
        EC: "-1",
        DT: "",
      });
    }
  }
  async unFollow(req, res) {
    const { followerId, followingId } = req.body;
    try {
      const un = await userService.unFollow(req.body);
      return res.status(200).json(un);
    } catch (error) {
      return res.status(500).json({
        EM: "error message",
        EC: "-1",
        DT: "",
      });
    }
  }
  async follow(req, res) {
    const { followerId, followingId } = req.body;
    try {
      const follow = await userService.follow(req.body);
      return res.status(200).json(follow);
    } catch (error) {
      return res.status(500).json({
        EM: "error message",
        EC: "-1",
        DT: "",
      });
    }
  }
  async updateUser(req, res) {
    const file = req.file ? req.file.path : null;
    const { idUser, username, story, link } = req.body;
    const id = req.params.id;

    try {
      const user = await userService.updateUser(
        id,
        { idUser, username, story, link },
        file,
        idUser
      );
      console.log("Updated User:", user);
      return res.status(200).json(user);
    } catch (error) {
      console.error("Update Error:", error);
      return res.status(500).json({
        EM: "error message",
        EC: "-1",
        DT: "",
      });
    }
  }

  async getMe(req, res) {
    const id = req.params.id;
    try {
      const me = await userService.getMe(id);
      return res.status(200).json(me);
    } catch (error) {
      return res.status(500).json({
        EM: "error message",
        EC: "-1",
        DT: "",
      });
    }
  }
  async getAllUser(req, res) {
    try {
      const user = await userService.allUser();
      return res.status(200).json(user);
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

  async search(req, res) {
    const { query } = req.query;
    try {
      const searchUser = await userService.search(query);
      return res.status(200).json(searchUser);
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new UsersController();

const authService = require("../../services/authService");
const jwt = require("jsonwebtoken");
require("dotenv").config();
class AuthController {
  async logout(req, res) {}
  async register(req, res) {
    const { idUser, username, email, password } = req.body;
    try {
      if (!idUser || !username || !email || !password) {
        return res.status(400).json("missing");
      }
      const register = await authService.resterService(req.body);
      if (register.err) {
        return res.status(400).json({ error: register.err });
      }
      return res.status(200).json(register);
    } catch (error) {
      return res.status(500).json({
        EM: "error message",
        EC: "-1",
        DT: "",
      });
    }
  }
  async login(req, res) {
    const { idUser, email, password } = req.body;
    try {
      if (!idUser || (!email && !password)) {
        return res.status(400).json("not Email and password");
      }
      const login = await authService.loginService(req.body);
      if (login.err) {
        return res.status(400).json({ error: login.err });
      }
      const { accessToken, user, refresh_token } = login;
      res.cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: true,
        sameSite: "Strict",
      });
      return res.status(200).json(login);
    } catch (error) {
      return res.status(500).json({
        EM: "error message",
        EC: "-1",
        DT: "",
      });
    }
  }

  getToken(req, res) {
    if (
      !req.headers.authorization ||
      !req.headers.authorization.startsWith("Bearer ")
    ) {
      return res
        .status(401)
        .json({ message: "No token provided or token is invalid" });
    }
    const token = req.headers.authorization.split(" ")[1];

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, function (err, user) {
      if (err) {
        return res.status(401).json({ message: "Invalid token", err });
      }
      res.json({
        idUser: user.idUser,
        username: user.username,
        image: user.image,
      });
      req.user = user;
    });
  }
}

module.exports = new AuthController();

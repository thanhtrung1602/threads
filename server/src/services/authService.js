const bcrypt = require("bcryptjs");
const db = require("../models/index");
const jwt = require("jsonwebtoken");
const { where } = require("sequelize");
const salt = bcrypt.genSaltSync(10);
require("dotenv").config();
function hashUserPassword(password) {
  const hashPassword = bcrypt.hashSync(password, salt);
  return hashPassword;
}
async function resterService({ idUser, username, email, password }) {
  const hashPass = hashUserPassword(password);
  try {
    const user = await db.User.findOrCreate({
      where: {
        email,
        idUser,
      },
      defaults: {
        idUser,
        username,
        password: hashPass,
      },
    });
    return { user };
  } catch (error) {
    console.error("Error creating new user:", error);
    throw error;
  }
}

function generateAccessToken(data) {
  return jwt.sign(data, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "1d" });
}

function generateRefreshToken(data) {
  return jwt.sign(data, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "365d" });
}

async function loginService({ idUser, email, password }) {
  try {
    let user;
    if (email) {
      user = await db.User.findOne({
        where: { email },
      });
    } else if (idUser) {
      user = await db.User.findOne({
        where: { idUser },
        raw: true,
      });
    }

    if (!user) {
      return { err: "Email or password invalid" };
    }

    const isCorrectPass = bcrypt.compareSync(password, user.password);
    if (!isCorrectPass) {
      return { err: "Email or password invalid" };
    }
    const accessToken = generateAccessToken({
      idUser: user.idUser,
      username: user.username,
      image: user.image,
    });

    const refresh_token = generateRefreshToken({
      idUser: user.idUser,
      username: user.username,
      image: user.image,
    });

    return { user, accessToken, refresh_token };
  } catch (error) {
    console.error("User not found.", error);
    throw error;
  }
}

module.exports = {
  resterService,
  loginService,
};

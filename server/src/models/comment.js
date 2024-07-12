"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Comment.belongsTo(models.User, {
        foreignKey: "user_id",
        targetKey: "idUser",
        as: "userData",
      });
      Comment.belongsTo(models.Post, {
        foreignKey: "postId",
        targetKey: "id",
        as: "postData",
      });
    }
  }
  Comment.init(
    {
      content: DataTypes.STRING,
      media: DataTypes.STRING,
      user_id: DataTypes.STRING,
      postId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Comment",
    }
  );
  return Comment;
};

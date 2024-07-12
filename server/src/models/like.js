"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Like extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Like.belongsTo(models.User, {
        foreignKey: "user_id",
        targetKey: "idUser",
        as: "userData",
      });
      Like.belongsTo(models.Post, {
        foreignKey: "postId",
        targetKey: "id",
        as: "postData",
      });
    }
  }
  Like.init(
    {
      status: DataTypes.BOOLEAN,
      user_id: DataTypes.STRING,
      postId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Like",
    }
  );
  return Like;
};

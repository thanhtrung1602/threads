"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Follow extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Follow.belongsTo(models.User, {
        foreignKey: "followerId",
        targetKey: "idUser",
        as: "follower",
      });
      Follow.belongsTo(models.User, {
        foreignKey: "followingId",
        targetKey: "idUser",
        as: "following",
      });
    }
  }
  Follow.init(
    {
      followerId: DataTypes.STRING,
      followingId: DataTypes.STRING,
      status: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "Follow",
    }
  );
  return Follow;
};

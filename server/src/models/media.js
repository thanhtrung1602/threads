"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Media extends Model {
    static associate(models) {
      Media.belongsTo(models.Post, {
        foreignKey: "post_id",
        targetKey: "id",
        as: "post",
      });
    }
  }
  Media.init(
    {
      media: DataTypes.STRING,
      post_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Media",
      tableName: "medias",
    }
  );
  return Media;
};

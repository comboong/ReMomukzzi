"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.user.hasMany(models.review, {
        foreignKey: "user_id",
        sourceKey: "id",
        onDelete: "cascade",
      });

      models.user.hasMany(models.article, {
        foreignKey: "user_id",
        sourceKey: "id",
        onDelete: "cascade",
      });
    }
  }
  user.init(
    {
      user_id: DataTypes.STRING,
      password: DataTypes.STRING,
      email: DataTypes.STRING,
      nickname: DataTypes.STRING,
      total_review: DataTypes.INTEGER,
      oauth: DataTypes.BOOLEAN
    },
    {
      sequelize,
      modelName: "user",
    }
  );
  return user;
};

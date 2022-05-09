"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class review extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.review.belongsTo(models.shop, {
        foreignKey: "shop_id",
        targetKey: "id",
        onDelete: "cascade",
      });

      models.review.belongsTo(models.user, {
        foreignKey: "user_id",
        targetKey: "id",
        onDelete: "cascade",
      });

      models.review.hasMany(models.review_pic, {
        foreignKey: "review_id",
        sourceKey: "id",
        onDelete: "cascade",
      });

      // models.review.belongsTo(models.review_pic, {
      //   foreignKey: "review_id",
      //   targetKey: "id",
      //   onDelete: "cascade",
      // });

    }
  }
  review.init(
    {

      user_id: DataTypes.INTEGER,
      shop_id: DataTypes.INTEGER,
      comment: DataTypes.TEXT,
      star: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "review",
    }
  );
  return review;
};

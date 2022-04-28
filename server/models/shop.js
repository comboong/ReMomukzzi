"use strict";
const { Model } = require("sequelize");
const Sequelize = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class shop extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.shop.hasMany(models.review, {
        foreignKey: "shop_id",
        sourceKey: "id",
        onDelete: "cascade",
      });

      models.shop.hasMany(models.shop_pic, {
        foreignKey: "shop_id",
        sourceKey: "id",
        onDelete: "cascade",
      });

      models.shop.hasMany(models.menu, {
        foreignKey: "shop_id",
        sourceKey: "id",
        onDelete: "cascade",
      });

      models.shop.hasMany(models.shop_tag, {
        foreignKey: "shop_id",
        sourceKey: "id",
        onDelete: "cascade",
      });
    }
  }

  shop.init(
    {
      shop_name: DataTypes.STRING,
      genus: DataTypes.STRING,
      location: DataTypes.STRING,
      total_review: DataTypes.INTEGER,
      star_avg: DataTypes.FLOAT(3,2),
      work_time: DataTypes.STRING,
      holiday: DataTypes.STRING,
      map_id: DataTypes.STRING,
      x: DataTypes.DOUBLE,
      y: DataTypes.DOUBLE,
      status: DataTypes.BOOLEAN
    },
    {
      sequelize,
      modelName: "shop",
    }
  );
  return shop;
};

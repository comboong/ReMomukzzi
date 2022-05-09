"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class shop_pic extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.shop_pic.belongsTo(models.shop, {
        foreignKey: "shop_id",
        targetKey: "id",
        onDelete: "cascade",
      });

    }
  }
  shop_pic.init(
    {

      shop_id: DataTypes.INTEGER,
      pic_URL: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "shop_pic",
    }
  );
  return shop_pic;
};

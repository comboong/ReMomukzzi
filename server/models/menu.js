"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class menu extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.menu.belongsTo(models.shop, {
        foreignKey: "shop_id",
        targetKey: "id",
        onDelete: "cascade",
      });
    }
  }
  menu.init(
    {
      shop_id: DataTypes.INTEGER,
      menu_name: DataTypes.STRING,
      price: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "menu",
    }
  );
  return menu;
};

"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class shop_tag extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.shop_tag.belongsTo(models.shop, {
        foreignKey: "shop_id",
        targetKey: "id",
        onDelete: "cascade",
      });

      models.shop_tag.belongsTo(models.tag, {
        foreignKey: "tag_id",
        targetKey: "id",
        onDelete: "cascade",
      });
    }
  }
  shop_tag.init(
    {

      shop_id: DataTypes.INTEGER,
      tag_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "shop_tag",
    }
  );
  return shop_tag;
};

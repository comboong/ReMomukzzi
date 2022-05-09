"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class article extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.menu.belongsTo(models.user, {
        foreignKey: "user_id",
        targetKey: "id",
        onDelete: "cascade",
      });
    }
  }
  article.init(
    {
      user_id : DataTypes.INTEGER,
      title: DataTypes.STRING,
      content: DataTypes.TEXT
    },
    {
      sequelize,
      modelName: "article",
    }
  );
  return article;
};

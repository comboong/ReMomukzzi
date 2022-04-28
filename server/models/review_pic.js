"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class review_pic extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.review_pic.belongsTo(models.review, {
        foreignKey: "review_id",
        targetKey: "id",
        onDelete: "cascade",
      });

      // models.user.hasMany(models.review, {
      //   foreignKey: "review_id",
      //   sourceKey: "id",
      //   onDelete: "cascade",
      // });
    }
  }
  review_pic.init(
    {

      review_id : DataTypes.INTEGER,
      pic_URL : DataTypes.TEXT
    },
    {
      sequelize,
      modelName: "review_pic",
    }
  );
  return review_pic;
};

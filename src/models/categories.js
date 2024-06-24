"use strict";

import BaseModel from "../helpers/baseModel";

module.exports = (sequelize, DataTypes) => {
  class Categories extends BaseModel {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Categories.hasMany(models.Products, {
        foreignKey: "category_id",
        as: "category_data",
        onDelete: "cascade",
        hooks: true,
      });
    }

    validateCategory() {
      if (!this.dataValues.name) {
        return {
          status: false,
          message: "Category name is required!",
        };
      }

      return {
        status: true,
        message: "Payload is Valid!",
      };
    }
  }
  Categories.init(
    {
      name: DataTypes.STRING,
      description: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "Categories",
    }
  );

  return Categories;
};
/*

name	char(255)		no
description	char(500)   no
*/

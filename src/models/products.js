"use strict";

import Joi from "joi";
import BaseModel from "../helpers/baseModel";

module.exports = (sequelize, DataTypes) => {
  class Products extends BaseModel {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Products.belongsTo(models.Categories, {
        foreignKey: "category_id",
        as: "category_data",
      });
      Products.hasMany(models.OrderDetail, {
        foreignKey: "productId",
        as: "product_data",
      });
      Products.belongsTo(models.Markdowns, {
        foreignKey: "markdown_id",
        as: "markdown_data",
      });
      Products.hasMany(models.Comment, {
        foreignKey: "product_id",
        as: "product_comment",
        onDelete: "cascade",
        hooks: true,
      });
    }

    validateProduct = async () => {
      const schema = Joi.object({
        name: Joi.string().required(),
        price: Joi.number().min(0).required(),
        stock_quantity: Joi.number().min(0).required(),
        category_id: Joi.number().required(),
        images: Joi.string().required(),
      }).unknown(true); // unknown(true): accepts payloads that are not within the defined schema

      try {
        const value = await schema.validateAsync({ ...this.dataValues });
        if (value) return { status: true, message: "Payload is valid!" };
      } catch (error) {
        return {
          status: false,
          message: error.details?.[0]?.message,
        };
      }
    };
  }
  Products.init(
    {
      name: DataTypes.STRING,
      description: DataTypes.TEXT,
      price: DataTypes.INTEGER,
      stock_quantity: DataTypes.INTEGER,
      category_id: DataTypes.INTEGER,
      images: DataTypes.TEXT,
      markdown_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Products",
    }
  );
  return Products;
};
/*

name	char(255)		no
description	string 
price	int	no
stock_quantity	int	no
category_id fk:categories	no		
images string
*/

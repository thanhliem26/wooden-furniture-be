"use strict";

import Joi from "joi";
import BaseModel from "../helpers/baseModel";

module.exports = (sequelize, DataTypes) => {
  class Markdowns extends BaseModel {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Markdowns.hasOne(models.Products, {
        foreignKey: "markdown_id",
        as: "markdown_data",
        onDelete: "cascade",
        hooks: true,
      });
    }

    validateMarkdown = async () => {
      const schema = Joi.object({
        contentHTML: Joi.string().required(),
        contentMarkdown: Joi.string().required(),
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
  Markdowns.init(
    {
      contentHTML: DataTypes.TEXT,
      contentMarkdown: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "Markdowns",
       tableName: "Markdown",
    }
  );
  return Markdowns;
};
/*

name	char(255)		no
description	string 
price	int	no
stock_quantity	int	no
category_id fk:categories	no		
images string
*/

"use strict";
import Joi from "joi";
import BaseModel from "../helpers/baseModel";

module.exports = (sequelize, DataTypes) => {
  class News extends BaseModel {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      News.belongsTo(models.Markdowns, {
        foreignKey: "markdown_id",
        as: "Markdown_data",
      });
    }

    validateNews = async () => {
      const schema = Joi.object({
        name: Joi.string().required(),
        image: Joi.string().required(),
        markdown_id: Joi.number().allow(null),
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
  News.init(
    {
      name: DataTypes.STRING,
      image: DataTypes.TEXT,
      markdown_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "News",
    }
  );
  return News;
};
/*

name string no
image text no 
markdown_id int no
*/

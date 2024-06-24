"use strict";
import BaseModel from "../helpers/baseModel";
import Joi from "joi";

module.exports = (sequelize, DataTypes) => {
  class AboutUs extends BaseModel {
    static associate(models) {
      AboutUs.belongsTo(models.Markdowns, {
        foreignKey: "markdown_id",
        as: "markdown_data",
        onDelete: "cascade",
        hooks: true,
      });
    }

    async validateAboutUs() {
      const schema = Joi.object({
        name: Joi.string().required(),
        address: Joi.string().required(),
        address_link: Joi.string().required(),
        phone_number: Joi.string().required(),
        email: Joi.string().required(),
        logo: Joi.string().required(),
        image: Joi.string().required(),
        is_active: Joi.string().valid("0", "1"),
        markdown_id: Joi.number().allow(null),
      }).unknown(true);;

      try {
        const value = await schema.validateAsync({ ...this.dataValues });
        if (value) return { status: true, message: "Payload is valid!" };
      } catch (error) {
        return {
          status: false,
          message: error.details?.[0]?.message,
        };
      }
    }
  }
  AboutUs.init(
    {
      name: DataTypes.STRING,
      address: DataTypes.STRING,
      address_link: DataTypes.STRING,
      phone_number: DataTypes.STRING(25),
      email: DataTypes.TEXT,
      logo: DataTypes.TEXT,
      image: DataTypes.STRING,
      is_active: DataTypes.ENUM("0", "1"),
      markdown_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "AboutUs",
    }
  );

  return AboutUs;
};

"use strict";

import Joi from "joi";
import BaseModel from "../helpers/baseModel";

module.exports = (sequelize, DataTypes) => {
  class Evaluate extends BaseModel {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Evaluate.belongsTo(models.Products, {
        foreignKey: "product_id",
        as: "product_evaluate",
      });
      Evaluate.belongsTo(models.User, {
        foreignKey: "user_id",
        as: "user_evaluate",
      });
      Evaluate.hasOne(models.OrderDetail, {
        foreignKey: "evaluate_id",
        as: "evaluate_data",
      });
    }

    validateEvaluate = async () => {
      const schema = Joi.object({
        star: Joi.string().valid('1', '2', '3', '4', '5'),
        evaluate: Joi.string().required(),
        user_id: Joi.number().required(),
        product_id: Joi.number().required(),
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

    //nested set model (https://en.wikipedia.org/wiki/Nested_set_model)
  }
  Evaluate.init(
    {
      star: DataTypes.ENUM("1", "2", "3", "4", "5"),
      evaluate: DataTypes.TEXT,
      user_id: DataTypes.INTEGER,
      product_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Evaluate",
    }
  );
  return Evaluate;
};

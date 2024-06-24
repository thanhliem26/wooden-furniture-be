"use strict";

import Joi from "joi";
import BaseModel from "../helpers/baseModel";

module.exports = (sequelize, DataTypes) => {
  class Comment extends BaseModel {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Comment.belongsTo(models.Products, {
        foreignKey: "product_id",
        as: "product_comment",
      });
      Comment.belongsTo(models.User, {
        foreignKey: "user_id",
        as: "user_comment",
      });
    }

    validateComment = async () => {
      const schema = Joi.object({
        product_id: Joi.number(),
        news_id: Joi.number(),
        user_id: Joi.number().required(),
        content: Joi.string().required(),
        parent_id: Joi.number(),
      }).or('product_id', 'news_id').unknown(true); // unknown(true): accepts payloads that are not within the defined schema

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
  Comment.init(
    {
      product_id: DataTypes.INTEGER,
      news_id: DataTypes.INTEGER,
      user_id: DataTypes.INTEGER,
      content: DataTypes.TEXT,
      left: DataTypes.INTEGER,
      right: DataTypes.INTEGER,
      parent_id: DataTypes.INTEGER,
      is_deleted: DataTypes.ENUM('0', '1'),
    },
    {
      sequelize,
      modelName: "Comment",
    }
  );
  return Comment;
};
/*

product_id	fk	no
user_id fk	no 
content	string	no
left integer no
right integer	no		
parent_id integer 
is_deleted integer
*/

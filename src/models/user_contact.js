"use strict";
import BaseModel from "../helpers/baseModel";
import Joi from "joi";

module.exports = (sequelize, DataTypes) => {
  class UserContact extends BaseModel {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      UserContact.belongsTo(models.User, {
        foreignKey: "user_id",
        as: "user_data",
        onDelete: "cascade",
        hooks: true,
      });
    }

    validateUserContact = async () => {
        const schema = Joi.object({
          name: Joi.string().required(),
          email: Joi.string().email().required(),
          phone_number: Joi.string().required(),
          address: Joi.string().required(),
          content: Joi.string().required(),
          user_id: Joi.number().allow(null).required(),
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
  UserContact.init(
    {
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      phone_number: DataTypes.STRING(25),
      address: DataTypes.STRING,
      content: DataTypes.STRING,
      is_read: DataTypes.ENUM('0', '1'),
      user_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "UserContact",
      freezeTableName: true
    }
  );
  return UserContact;
};


"use strict";

import BaseModel from "../helpers/baseModel";
import Joi from "joi";

module.exports = (sequelize, DataTypes) => {
  class Static extends BaseModel {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }

    validateStatic = async () => {
      const schema = Joi.object({
        Images: Joi.string().allow(''),
        ImageSP: Joi.string().allow(''),
        type: Joi.number().required(),
        productShow: Joi.string().allow(''),
      }).unknown(true); // unknown(true): accepts payloads that are not within the defined schema

      try {
        const value = await schema.validateAsync({ ...this.dataValues });
        if (value) return { status: true, message: "Payload is valid!" };
      } catch (error) {
        console.log("🚀 ~ error:", error)
        return {
          status: false,
          message: error.details?.[0]?.message,
        };
      }
    };

  }
  Static.init(
    {
      Images: DataTypes.TEXT,
      ImageSP: DataTypes.TEXT,
      type: DataTypes.UUID,
      productShow: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "Static",
      // tableName: "Static",
      freezeTableName: true
    }
  );
  return Static;
};

/*
Name	type	descrption	is Null	default
id	int		no	
homeImages	TEXT image list to show in home page for user			
homeImageSp	TEXT image sp list to show in home page for user		
productShow	TEXT list id product show in homePage		
introduceImage	TEXT image to show in introduce page	
created_at	date		no	
update_at	date		no	

*/

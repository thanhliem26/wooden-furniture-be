'use strict';

import BaseModel from '../helpers/baseModel';

module.exports = (sequelize, DataTypes) => {
  class Token extends BaseModel {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      
    }
  }
  Token.init({
    user_id: DataTypes.INTEGER,
    publicKey: DataTypes.STRING,
    privateKey: DataTypes.STRING,
    refreshTokenUsed: DataTypes.JSON,
    refreshToken: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Token',
  });
  return Token;
};
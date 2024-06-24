'use strict';
import Joi from "joi";
import BaseModel from '../helpers/baseModel';

module.exports = (sequelize, DataTypes) => {
  class OrderDetail extends BaseModel {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      OrderDetail.belongsTo(models.Orders, { foreignKey: "order_id", as: "order_detail" })
      OrderDetail.belongsTo(models.Products, { foreignKey: "productId", as: "product_data" })
      OrderDetail.belongsTo(models.Evaluate, { foreignKey: "evaluate_id", as: "evaluate_data" })
    }

    validateOrderDetail = async () => {
      const schema = Joi.object({
        order_id: Joi.number().required(),
        productId: Joi.number().required(),
        quantity: Joi.number().min(1).required(),
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
  OrderDetail.init({
    order_id: DataTypes.INTEGER,
    productId: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER,
    evaluate_id: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'OrderDetail',
    tableName: 'Order_detail',
  });
  return OrderDetail;
};
/*

order_id	int		no
product_id	string danh sách id sản phẩm no
quantity int số lượng sản phẩm có trong đơn hàng
unit_list_price string số tiền cho từng sản phẩm
*/

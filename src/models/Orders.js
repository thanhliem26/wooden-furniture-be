"use strict";
import Joi from "joi";
import BaseModel from "../helpers/baseModel";

module.exports = (sequelize, DataTypes) => {
  class Orders extends BaseModel {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Orders.hasMany(models.OrderDetail, {
        foreignKey: "order_id",
        as: "order_detail",
        onDelete: "cascade",
        hooks: true,
      });
      Orders.belongsTo(models.User, { foreignKey: "user_id", as: "user_data" });
    }

    validateOrder = async () => {
      const schema = Joi.object({
        user_id: Joi.number().required(),
        order_status: Joi.string().valid(
          "pending",
          "wait_confirmation",
          "confirmed",
          "shipped",
          "cancelled",
          "delivered"
        ),
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
  Orders.init(
    {
      user_id: DataTypes.INTEGER,
      order_status: DataTypes.ENUM(
        "pending",
        "wait_confirmation",
        "confirmed",
        "shipped",
        "cancelled",
        "delivered"
      ),
      name: DataTypes.STRING,
      phone_number: DataTypes.STRING,
      email: DataTypes.STRING,
      address: DataTypes.STRING,
      note: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "Orders",
    }
  );
  return Orders;
};
/*

user_id	int	fk: user	
order_date	date ngày_submit_order no
total_amount int tổng số tiền
order_status enum
    - pending: đang trong trạng thái chờ (default)
    - confirmed: đã xác nhận bên phía user 
    - shipped: đã bàn giao cho ship
    - cancelled: đã xóa bởi user (hành động sẽ không được sử dụng nếu đang trong trạng thái shipped)
    - dellivered: xác nhận giao hàng thành công
*/

import { BadRequestError } from "../../core/error.response";
const { Op } = require("sequelize");
import db, { sequelize } from "../index";

const validateOrderDetail = async (payload) => {
  const newOrderDetail = await db.OrderDetail.build({
    ...payload,
  });

 return await newOrderDetail.validateOrderDetail();
};

const createNewOrderDetail = async (payload) => {
  const order_isValid = await validateOrderDetail(payload);

  if (order_isValid.status === false) {
    throw new BadRequestError(order_isValid.message);
  }

  //add quantity
  const { productId, order_id } = payload;

  const filter = { order_id, productId };
  if(payload.id) filter.id = payload.id;
  
  const update = { ...payload };
  const options = { upsert: true };

  return await db.OrderDetail.findOneAndUpdate({
    filter: filter,
    values: update,
    options: options,
  });
};

module.exports = {
    createNewOrderDetail,
};

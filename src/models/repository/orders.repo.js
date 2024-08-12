import { ORDER_STATUS } from "../../constants";
import { BadRequestError } from "../../core/error.response";
import db, { sequelize } from "../index";
import AboutUsService from '../../services/aboutUs.service';
import { sendMailAWSOrderForShop, sendMailAWSWhenOrder } from "../../utils/send-mail-aws";

const validateOrder = async (payload) => {
  const newOrder = await db.Orders.build({
    ...payload,
  });

  return await newOrder.validateOrder();
};

const createNewOrder = async (payload) => {
  const order_isValid = await validateOrder(payload);

  if (order_isValid.status === false) {
    throw new BadRequestError(order_isValid.message);
  }

  //add quantity
  const { user_id } = payload;
  const user = await db.User.findByPk(user_id);
  const { fullName, phoneNumber, email, address } = user;

  const filter = { order_status: "pending", user_id };
  const update = {
    ...payload,
    name: fullName,
    phone_number: phoneNumber,
    email,
    address,
  };
  const options = { upsert: true };

  return await db.Orders.findOneAndUpdate({
    filter: filter,
    values: update,
    options: options,
  });
};

const updateOrder = async (payload) => {
  if (!payload.id) {
    throw new BadRequestError("Order id is not empty!");
  }

  //add quantity
  const order = await db.Orders.findByPk(payload.id);
  if (!order) {
    throw new BadRequestError("Order not exits!");
  }

  //sendMail user
  const orderDetail = await db.OrderDetail.findAll({
    where: { order_id: order.id },
    attributes: [
      "quantity",
      [sequelize.literal("product_data.name"), "name"],
      [sequelize.literal("product_data.price"), "price"],
    ],
    include: [{ model: db.Products, as: "product_data", attributes: [] }],
    raw: true,
  });

  if (
    order.order_status === ORDER_STATUS.PENDING &&
    payload?.order_status === ORDER_STATUS.WAIT_CONFIRMATION
  ) {
    const activeAB = await AboutUsService.getActiveAbout();
    sendMailAWSWhenOrder({ orderDetail, order, activeAB });
    sendMailAWSOrderForShop({ orderDetail, order, activeAB });
  }

  for (let property in payload) {
    order[property] = payload[property];
  }

  const order_isValid = await order.validateOrder();
  if (order_isValid.status === false) {
    throw new BadRequestError(order_isValid.message);
  }

  return await order.save();
};

module.exports = {
  createNewOrder,
  updateOrder,
};

("use strict");
import db from "../models";
import { createNewOrder, updateOrder } from '../models/repository/orders.repo';

class OrderService {
  static UpdateOrder = async (payload) => {
    return await updateOrder(payload);
  };

  static deleteOrder = async (orderId) => {
    return await db.Orders.destroy({
      where: {
        id: orderId,
      },
    });
  };

  static searchOrder = async (query) => {
    const page = +query.page || 1;
    const limit = query.limit ? +query.limit : null;
    const filterSearch = {};
    
    if(query.order_status) {
      filterSearch.order_status = query.order_status
    }

    if(query.user_id) {
      filterSearch.user_id = query.user_id
    }

    const queryOptions = {
      where: {
        ...filterSearch
      },
      include: [{ model: db.OrderDetail, as: "order_detail",  attributes: [
        "id",
        "order_id",
        "productId",
        "quantity",
      ], include: [{ model: db.Products, as: "product_data"}] }],
      offset: (page - 1) * limit,
      order: [["createdAt", "DESC"]],
    }
  
    if (limit !== null) {
      queryOptions.limit = limit;
    }

    const count = await db.Orders.count();
    const result = await db.Orders.findAndCountAll(queryOptions);

    return {
      count: count,
      rows: result.rows,
    };
  };

  static createOrder = async (data) => {
    return await createNewOrder(data)
  };
  
}

module.exports = OrderService;

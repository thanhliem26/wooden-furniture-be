'use strict'

const OrderService = require("../services/orders.service");
const { OK, CREATED, SuccessResponse, UPDATED, DELETED } = require('../core/succes.response');

class OrderController {
    updateOrder = async (req, res, next) => {
        new UPDATED({
            message: 'update order success!',
            metadata: await OrderService.UpdateOrder(req.body),
        }).send(res)
    }

    deleteOrder = async (req, res, next) => {
        new DELETED({
            message: 'delete order success!',
            metadata: await OrderService.deleteOrder(req.params.id),
        }).send(res)
    }

    searchOrder = async (req, res, next) => {
        new SuccessResponse({
            message: 'get order list success!',
            metadata: await OrderService.searchOrder(req.query),
            options: {
                ...req.query
            }
        }).send(res)
    }

    createOrder = async (req, res, next) => {
        new CREATED({
            message: 'create a new order success!',
            metadata: await OrderService.createOrder(req.body),
        }).send(res)
    }

}

module.exports = new OrderController
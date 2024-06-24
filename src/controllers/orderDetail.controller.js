'use strict'

const OrderDetailService = require("../services/orderDetail.service");
const { CREATED, SuccessResponse, UPDATED, DELETED } = require('../core/succes.response');

class OrderController {
    deleteOrderDetail = async (req, res, next) => {
        new DELETED({
            message: 'delete order detail success!',
            metadata: await OrderDetailService.deleteOrderDetail(req.params.id),
        }).send(res)
    }

    getOrderDetailById = async (req, res, next) => {
        new SuccessResponse({
            message: 'get order detail list success!',
            metadata: await OrderDetailService.getOrderDetailById(req.query),
            options: {
                ...req.query
            }
        }).send(res)
    }

    createOrderDetail = async (req, res, next) => {
        new CREATED({
            message: 'create a new order detail success!',
            metadata: await OrderDetailService.createOrderDetail(req.body),
        }).send(res)
    }

    updateOrderDetail = async (req, res, next) => {
        new UPDATED({
            message: 'update order detail success!',
            metadata: await OrderDetailService.updateOrderDetail(req.body),
        }).send(res)
    }

    getListOrderDetailExcludePending = async (req, res, next) => {
        new SuccessResponse({
            message: 'get list order detail success!',
            metadata: await OrderDetailService.getOrderDetailExcludePending(req.query, req.user.user_id),
        }).send(res)
    }

    getListStatistical = async (req, res, next) => {
        new SuccessResponse({
            message: 'get list order statistical success!',
            metadata: await OrderDetailService.getOrderDetailToStatistical(req.query),
        }).send(res)
    }

}

module.exports = new OrderController
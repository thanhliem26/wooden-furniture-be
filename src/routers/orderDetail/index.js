'use strict'

const express = require('express');
const OrderDetailController = require('../../controllers/orderDetail.controller');
const router = express.Router();
const  asyncHandler = require('../../helpers/asyncHandler');
const { authentication, isAdmin } = require('../../auth/authUtils');

//authentication token
router.use(authentication);
router.post('/create', asyncHandler(OrderDetailController.createOrderDetail));
router.get('/get-orderDetail-byId', asyncHandler(OrderDetailController.getOrderDetailById));
router.get('/get-orderDetail', asyncHandler(OrderDetailController.getListOrderDetailExcludePending));
router.delete('/delete/:id', asyncHandler(OrderDetailController.deleteOrderDetail));
router.patch('/update', asyncHandler(OrderDetailController.updateOrderDetail));
//role admin
router.use(isAdmin);
router.get('/get-statistical', asyncHandler(OrderDetailController.getListStatistical));

module.exports = router;
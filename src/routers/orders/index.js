'use strict'

const express = require('express');
const OrderController = require('../../controllers/orders.controller');
const router = express.Router();
const  asyncHandler = require('../../helpers/asyncHandler');
const { authentication, authenticationV2, isAdmin } = require('../../auth/authUtils');

//authentication token
router.use(authentication);
router.post('/create-orders', asyncHandler(OrderController.createOrder));
router.get('/list', asyncHandler(OrderController.searchOrder));
router.put('/update', asyncHandler(OrderController.updateOrder));
router.delete('/delete/:id', asyncHandler(OrderController.deleteOrder));

//role admin
router.use(isAdmin);


//authentication refreshToken
// router.use(authenticationV2);


module.exports = router;
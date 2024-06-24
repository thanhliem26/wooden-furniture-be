'use strict'

const express = require('express');
const ProductController = require('../../controllers/product.controller');
const router = express.Router();
const  asyncHandler = require('../../helpers/asyncHandler');
const { authentication, isAdmin } = require('../../auth/authUtils');


router.get('/get-range-price', asyncHandler(ProductController.getRangePrice));
router.get('/list', asyncHandler(ProductController.searchProduct));
router.get('/list-different-product', ProductController.listDifferent);
router.get('/:id', asyncHandler(ProductController.getProductById));
router.get('/top-product', asyncHandler(ProductController.getTopProduct));

//authentication token
router.use(authentication);
router.use(isAdmin); //role admin
router.post('/create-product', asyncHandler(ProductController.createNewProduct));
router.put('/update', asyncHandler(ProductController.updateProduct));
router.delete('/delete/:id', asyncHandler(ProductController.deleteProduct));

module.exports = router;
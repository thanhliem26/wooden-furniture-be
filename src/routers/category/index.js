'use strict'

const express = require('express');
const CategoryController = require('../../controllers/category.controller');
const router = express.Router();
const  asyncHandler = require('../../helpers/asyncHandler');
const { authentication, isAdmin } = require('../../auth/authUtils');

router.get('/list', asyncHandler(CategoryController.searchCategory));
//authentication token
router.use(authentication);
router.use(isAdmin); 
//role admin
router.post('/create-category', asyncHandler(CategoryController.createNewCategory));
router.put('/update', asyncHandler(CategoryController.updateCategory));
router.delete('/delete/:id', asyncHandler(CategoryController.deleteCategory));

module.exports = router;
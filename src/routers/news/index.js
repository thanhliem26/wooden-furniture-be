'use strict'

const express = require('express');
const NewsController = require('../../controllers/news.controller');
const router = express.Router();
const  asyncHandler = require('../../helpers/asyncHandler');
const { authentication, isAdmin } = require('../../auth/authUtils');

router.get('/list', asyncHandler(NewsController.searchNews));
router.get('/getById/:id', asyncHandler(NewsController.getNewsById));
//authentication token
router.use(authentication);
router.use(isAdmin); 
//role admin
router.post('/create', asyncHandler(NewsController.createNews));
router.put('/update', asyncHandler(NewsController.updateNews));
router.delete('/delete/:id', asyncHandler(NewsController.deleteNews));

module.exports = router;
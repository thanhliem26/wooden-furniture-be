'use strict'

const express = require('express');
const MarkdownController = require('../../controllers/markdown.controller');
const router = express.Router();
const  asyncHandler = require('../../helpers/asyncHandler');
const { authentication, isAdmin } = require('../../auth/authUtils');

//authentication token
router.use(authentication);
//role admin
router.use(isAdmin);
router.post('/create', asyncHandler(MarkdownController.createNewProduct));

module.exports = router;
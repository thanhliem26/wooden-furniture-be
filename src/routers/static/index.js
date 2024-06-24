'use strict'

const express = require('express');
const StaticController = require('../../controllers/static.controller');
const router = express.Router();
const  asyncHandler = require('../../helpers/asyncHandler');
const { authentication, isAdmin } = require('../../auth/authUtils');

router.get('/static-page', asyncHandler(StaticController.getStaticPage));
//authentication token
router.use(authentication);
 //role admin
router.use(isAdmin);
router.post('/set-static', asyncHandler(StaticController.setStatic));
router.get('/get-static', asyncHandler(StaticController.getStatic));

module.exports = router;
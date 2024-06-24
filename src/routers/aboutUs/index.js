'use strict'

const express = require('express');
const AboutUsController = require('../../controllers/aboutUs.controller');
const router = express.Router();
const  asyncHandler = require('../../helpers/asyncHandler');
const { authentication, isAdmin } = require('../../auth/authUtils');

router.get('/active', asyncHandler(AboutUsController.getActiveAboutUs));
//authentication token
router.use(authentication);
router.get('/list', asyncHandler(AboutUsController.searchAboutUs));
//role admin
router.use(isAdmin);
router.post('/create', asyncHandler(AboutUsController.createAboutUs));
router.put('/update', asyncHandler(AboutUsController.updateAboutUs));
router.delete('/delete/:id', asyncHandler(AboutUsController.deleteAboutUs));

module.exports = router;
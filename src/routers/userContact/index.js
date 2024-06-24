'use strict'

const express = require('express');
const UserContactController = require('../../controllers/userContact.controller');
const router = express.Router();
const  asyncHandler = require('../../helpers/asyncHandler');
const { authentication, isAdmin } = require('../../auth/authUtils');

router.post('/create', asyncHandler(UserContactController.createContact));
//authentication token
router.use(authentication);
// //role admin
router.use(isAdmin);
router.delete('/delete/:id', asyncHandler(UserContactController.deleteContact));
router.get('/list', asyncHandler(UserContactController.searchContact));
router.patch('/update/:id', asyncHandler(UserContactController.updateContact));

module.exports = router;
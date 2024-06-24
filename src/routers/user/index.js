'use strict'

const express = require('express');
const UserController = require('../../controllers/user.controller');
const router = express.Router();
const  asyncHandler = require('../../helpers/asyncHandler');
const { authentication, isAdmin } = require('../../auth/authUtils');

//authentication token
router.use(authentication);
router.get('/menu-user', asyncHandler(UserController.menuUser))
router.get('/me', asyncHandler(UserController.userInfo));
router.get('/menu',  asyncHandler(UserController.menu));
router.put('/update/:id', asyncHandler(UserController.updateUser));
router.put('/changePassword', asyncHandler(UserController.changePassword));

//role admin
router.use(isAdmin);
router.post('/create-user', asyncHandler(UserController.createNewUser));
router.get('/list', asyncHandler(UserController.searchUser));
router.get('/:id', asyncHandler(UserController.getUserById));
router.put('/delete/:id', asyncHandler(UserController.deleteUser));

module.exports = router;
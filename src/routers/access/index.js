'use strict'

const express = require('express');
const AccessController = require('../../controllers/access.controller');
const router = express.Router();
const  asyncHandler = require('../../helpers/asyncHandler');
const { authentication, authenticationV2 } = require('../../auth/authUtils');

import multer from 'multer';
const upload = multer({ dest: 'uploads/' });
//sign up, login
router.post('/signup', asyncHandler(AccessController.signUp)); 
router.post('/login', asyncHandler(AccessController.login)); 
router.post('/login-provider', asyncHandler(AccessController.loginProvider)); 
router.post('/active-user', asyncHandler(AccessController.activeUser)); 

// authentication token
router.use(authentication);
router.post('/uploadFIleS3', upload.single('file'), asyncHandler(AccessController.uploadFileS3)); 
router.delete('/deleteFileS3/:key', asyncHandler(AccessController.deleteFileS3)); 
// //authentication refreshToken
router.use(authenticationV2);

router.post('/logout', asyncHandler(AccessController.logout));
router.post('/handleRefreshToken', asyncHandler(AccessController.handleRefreshToken));


module.exports = router;
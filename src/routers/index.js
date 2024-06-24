'use strict'

const express = require('express');
// const { apiKey, permission } = require('../auth/checkAuth');
const router = express.Router();

//check permision
// router.use(permission('0000'))

//router handle
router.use('/v1/api/user', require('./user'));
router.use('/v1/api/access', require('./access'));
router.use('/v1/api/category', require('./category'));
router.use('/v1/api/product', require('./product'));
router.use('/v1/api/static', require('./static'));
router.use('/v1/api/order', require('./orders'));
router.use('/v1/api/orderDetail', require('./orderDetail'));
router.use('/v1/api/markdown', require('./markdown'));
router.use('/v1/api/comment', require('./comment'));
router.use('/v1/api/news', require('./news'));
router.use('/v1/api/userContact', require('./userContact'));
router.use('/v1/api/about-us', require('./aboutUs'));
router.use('/v1/api/evaluate', require('./evaluate'));

router.get('/', (req, res, next) => {
    return res.status(200).json({
        message: 'Hello word',
    })
})


module.exports = router;
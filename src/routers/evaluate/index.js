'use strict'

const express = require('express');
const EvaluateController = require('../../controllers/evaluate.controller');
const router = express.Router();
const  asyncHandler = require('../../helpers/asyncHandler');
const { authentication } = require('../../auth/authUtils');

router.get('/list', asyncHandler(EvaluateController.getListEvaluate));
//authentication token
router.use(authentication);
router.get('/:id', asyncHandler(EvaluateController.getEvaluate));
router.post('/create', asyncHandler(EvaluateController.createNewEvaluate));

module.exports = router;
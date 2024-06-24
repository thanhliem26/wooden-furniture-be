'use strict'

const EvaluateService = require("../services/evaluate.service");
const { CREATED, SuccessResponse } = require('../core/succes.response');

class CategoryController {
    getListEvaluate = async (req, res, next) => {
        new SuccessResponse({
            message: 'get evaluate list success!',
            metadata: await EvaluateService.getListEvaluate(req.query),
            options: {
                ...req.query
            }
        }).send(res)
    }

    getEvaluate = async (req, res, next) => {
        new SuccessResponse({
            message: 'get evaluate success!',
            metadata: await EvaluateService.getEvaluate(req.params.id),
            options: {
                ...req.query
            }
        }).send(res)
    }

    createNewEvaluate = async (req, res, next) => {
        new CREATED({
            message: 'create a new evaluate success!',
            metadata: await EvaluateService.createEvaluate({...req.body, user_id: req.user.user_id}),
        }).send(res)
    }
}

module.exports = new CategoryController
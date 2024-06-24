'use strict'

const CategoriesService = require("../services/category.service");
const { OK, CREATED, SuccessResponse, UPDATED, DELETED } = require('../core/succes.response');

class CategoryController {
    updateCategory = async (req, res, next) => {
        new UPDATED({
            message: 'update category success!',
            metadata: await CategoriesService.UpdateCategory(req.body),
        }).send(res)
    }

    deleteCategory = async (req, res, next) => {
        new DELETED({
            message: 'delete category success!',
            metadata: await CategoriesService.deleteCategory(req.params.id),
        }).send(res)
    }

    searchCategory = async (req, res, next) => {
        new SuccessResponse({
            message: 'get category list success!',
            metadata: await CategoriesService.searchCategory(req.query),
            options: {
                ...req.query
            }
        }).send(res)
    }

    createNewCategory = async (req, res, next) => {
        new CREATED({
            message: 'create a new category success!',
            metadata: await CategoriesService.createCategory(req.body),
        }).send(res)
    }
}

module.exports = new CategoryController
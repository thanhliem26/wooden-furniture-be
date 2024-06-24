'use strict'

const MarkdownService = require("../services/markdown.service");
const { OK, CREATED, SuccessResponse, UPDATED, DELETED } = require('../core/succes.response');

class MarkdownController {
    // updateProduct = async (req, res, next) => {
    //     new UPDATED({
    //         message: 'update product success!',
    //         metadata: await MarkdownService.UpdateProduct(req.body),
    //     }).send(res)
    // }

    // deleteProduct = async (req, res, next) => {
    //     new DELETED({
    //         message: 'delete product success!',
    //         metadata: await MarkdownService.deleteProduct(req.params.id),
    //     }).send(res)
    // }

    // searchProduct = async (req, res, next) => {
    //     new SuccessResponse({
    //         message: 'get product list success!',
    //         metadata: await MarkdownService.searchProduct(req.query),
    //         options: {
    //             ...req.query
    //         }
    //     }).send(res)
    // }

    createNewProduct = async (req, res, next) => {
        console.log("create markdown:::::::::::::")
        new CREATED({
            message: 'create a new markdown success!',
            metadata: await MarkdownService.createMarkdown(req.body),
        }).send(res)
    }

}

module.exports = new MarkdownController
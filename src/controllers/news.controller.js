'use strict'

const NewsService = require("../services/news.service");
const { OK, CREATED, SuccessResponse, UPDATED, DELETED } = require('../core/succes.response');

class NewsController {
    updateNews = async (req, res, next) => {
        new UPDATED({
            message: 'update news success!',
            metadata: await NewsService.UpdateNews(req.body),
        }).send(res)
    }

    deleteNews = async (req, res, next) => {
        new DELETED({
            message: 'delete news success!',
            metadata: await NewsService.deleteNews(req.params.id),
        }).send(res)
    }

    searchNews = async (req, res, next) => {
        new SuccessResponse({
            message: 'get news list success!',
            metadata: await NewsService.searchNews(req.query),
            options: {
                ...req.query
            }
        }).send(res)
    }

    getNewsById = async (req, res, next) => {
        new SuccessResponse({
            message: 'get news by id success!',
            metadata: await NewsService.getNewsById(req.params.id),
        }).send(res)
    }

    createNews = async (req, res, next) => {
        new CREATED({
            message: 'create a new news success!',
            metadata: await NewsService.createNews(req.body),
        }).send(res)
    }
}

module.exports = new NewsController
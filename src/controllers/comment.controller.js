'use strict'

const CommentService = require("../services/comment.service");
const { OK, CREATED, SuccessResponse, UPDATED, DELETED } = require('../core/succes.response');

class CommentController {
    updateComment = async (req, res, next) => {
        new UPDATED({
            message: 'update comment success!',
            metadata: await CommentService.UpdateComment(req.body, req.user),
        }).send(res)
    }

    deleteComment = async (req, res, next) => {
        new DELETED({
            message: 'delete comment success!',
            metadata: await CommentService.deleteComment(req.params.id, req.user),
        }).send(res)
    }

    getListComment = async (req, res, next) => {
        new SuccessResponse({
            message: 'get comment list success!',
            metadata: await CommentService.listCommentByProduct(req.query),
            options: {
                ...req.query
            }
        }).send(res)
    }

    getListChildrenComment = async (req, res, next) => {
        new SuccessResponse({
            message: 'get comment list children success!',
            metadata: await CommentService.listCommentChildren(req.query),
            options: {
                ...req.query
            }
        }).send(res)
    }

    createNewComment = async (req, res, next) => {
        new CREATED({
            message: 'create a new comment success!',
            metadata: await CommentService.createComment(req.body, req.user),
        }).send(res)
    }

    createNewsComment = async (req, res, next) => {
        new CREATED({
            message: 'create a new comment success!',
            metadata: await CommentService.createNewsComment(req.body, req.user),
        }).send(res)
    }

    getListNewsComment = async (req, res, next) => {
        new SuccessResponse({
            message: 'get comment news list success!',
            metadata: await CommentService.listCommentByNews(req.query),
            options: {
                ...req.query
            }
        }).send(res)
    }

    getListChildrenNewsComment = async (req, res, next) => {
        new SuccessResponse({
            message: 'get comment news list children success!',
            metadata: await CommentService.listChildrenCommentByNews(req.query),
            options: {
                ...req.query
            }
        }).send(res)
    }

}

module.exports = new CommentController
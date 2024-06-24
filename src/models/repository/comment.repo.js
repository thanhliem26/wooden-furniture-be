import { BadRequestError } from "../../core/error.response";
const { Op } = require("sequelize");
import db from "../index";

const validateComment = async (payload) => {
  const newComment = await db.Comment.build({
    ...payload,
  });

  return await newComment.validateComment();
};

const createNewComment = async (payload) => {
  const comment_valid = await validateComment(payload);

  if (comment_valid.status === false) {
    throw new BadRequestError(comment_valid.message);
  }

  const newComment = await db.Comment.build({
    ...payload,
  });
  const { product_id, parent_id } = payload;
  let rightValue;

  if (payload.parent_id) {
    //handle comment has parent

    //select parent
    const parentComment = await db.Comment.findOne({
      where: { product_id, id: parent_id },
    });

    if (!parentComment) throw new BadRequestError("parent is not exist");
    //get right of parent
    rightValue = parentComment.right;

    //update all comment has right, left >= right of parent;
    await db.Comment.update(
      // Giá trị mới của trường content
      { right: db.Sequelize.literal('`right` + 2') },
      {
        where: {
          // Lọc các comment có right >= rightValue
          right: { [Op.gte]: rightValue },
        },
        // Trả về các record đã được cập nhật
        returning: true,
      }
    );

    await db.Comment.update(
      { left: db.Sequelize.literal('`left` + 2') },
      {
        where: {
          left: { [Op.gte]: rightValue },
        },
        returning: true,
      }
    );
  } else {
    //handle comment not parent

    //get max right value comment of product
    const maxRightValue = await db.Comment.findOne({
      where: { product_id },
      order: [["right", "DESC"]],
    });

    //if haven't comment, assign 1, other maxRightValue + 1;
    rightValue = maxRightValue ? maxRightValue.right + 1 : 1;
  }

  newComment.left = rightValue;
  newComment.right = rightValue + 1;

  return await newComment.save();
};

const createCommentOfNews = async (payload) => {
  const comment_valid = await validateComment(payload);

  if (comment_valid.status === false) {
    throw new BadRequestError(comment_valid.message);
  }

  const newComment = await db.Comment.build({
    ...payload,
  });
  const { news_id, parent_id } = payload;
  let rightValue;

  if (payload.parent_id) {
    //handle comment has parent

    //select parent
    const parentComment = await db.Comment.findOne({
      where: { news_id, id: parent_id },
    });

    if (!parentComment) throw new BadRequestError("parent is not exist");
    //get right of parent
    rightValue = parentComment.right;

    //update all comment has right, left >= right of parent;
    await db.Comment.update(
      // Giá trị mới của trường content
      { right: db.Sequelize.literal('`right` + 2') },
      {
        where: {
          // Lọc các comment có right >= rightValue
          right: { [Op.gte]: rightValue },
        },
        // Trả về các record đã được cập nhật
        returning: true,
      }
    );

    await db.Comment.update(
      { left: db.Sequelize.literal('`left` + 2') },
      {
        where: {
          left: { [Op.gte]: rightValue },
        },
        returning: true,
      }
    );
  } else {
    //handle comment not parent

    //get max right value comment of product
    const maxRightValue = await db.Comment.findOne({
      where: { news_id },
      order: [["right", "DESC"]],
    });

    //if haven't comment, assign 1, other maxRightValue + 1;
    rightValue = maxRightValue ? maxRightValue.right + 1 : 1;
  }

  newComment.left = rightValue;
  newComment.right = rightValue + 1;

  return await newComment.save();
};

module.exports = {
  createNewComment,
  createCommentOfNews,
};

import { BadRequestError } from "../../core/error.response";
const { Op } = require("sequelize");
import db, { sequelize } from "../index";

const validateNews = async (payload) => {
  const newProduct = await db.News.build({
    ...payload,
  });

  return await newProduct.validateNews();
};

const createNewsRepo = async (payload) => {
  const product_isValid = await validateNews(payload);

  if (product_isValid.status === false) {
    throw new BadRequestError(product_isValid.message);
  }

  return await db.News.create({
    ...payload,
  });
};

const updateNewsRepo = async (payload) => {
  if (!payload.id) {
    throw new BadRequestError("id is not empty!");
  }

  const news = await db.News.findByPk(payload.id);
  for (let property in payload) {
    news[property] = payload[property];
  }

  const news_isValid = await news.validateNews();
  if (news_isValid.status === false) {
    throw new BadRequestError(news_isValid.message);
  }

  return await news.save();
};

module.exports = {
  createNewsRepo,
  updateNewsRepo,
};

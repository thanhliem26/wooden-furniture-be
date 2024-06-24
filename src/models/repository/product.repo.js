import { BadRequestError } from "../../core/error.response";
const { Op } = require("sequelize");
import db, { sequelize } from "../index";

const validateProduct = async (payload) => {
  const newProduct = await db.Products.build({
    ...payload,
  });

  return await newProduct.validateProduct();
};

const createNewProduct = async (payload) => {
  const product_isValid = await validateProduct(payload);

  if (product_isValid.status === false) {
    throw new BadRequestError(product_isValid.message);
  }

  return await db.Products.create({
    ...payload,
  });
};

const updateProduct = async (payload) => {
  if (!payload.id) {
    throw new BadRequestError("Product id is not empty!");
  }

  const product = await db.Products.findByPk(payload.id);
  for (let property in payload) {
    product[property] = payload[property];
  }

  const product_isValid = await product.validateProduct();
  if (product_isValid.status === false) {
    throw new BadRequestError(product_isValid.message);
  }

  return await product.save();
};

const getTopProductById = async ({ids, limitProduct = 8}) => {
  const category = await db.Products.findAll({
    category_id: {
      [Op.in]: ids,
    },
    attributes: [
      "category_id",
      [sequelize.fn("COUNT", sequelize.col("*")), "total"],
      [sequelize.literal("category_data.name"), "category_name"],
    ],
    include: [{ model: db.Categories, as: "category_data", attributes: [],  where: {
      id: {
        [Op.in]: ids,
      },
    }, }],
    raw: true,
    group: ["category_id"],
    // order: [[sequelize.literal("total"), "DESC"]],
  });

  const productInTop = await db.Products.findAll({
    where: {
      category_id: {
        [Op.in]: ids,
      },
    },
    raw: true,
    order: [['createdAt', "DESC"]],
  });

  const productsLimited = {};

productInTop.forEach(product => {
  const categoryId = product.category_id;
  if (!productsLimited[categoryId]) {
    productsLimited[categoryId] = [];
  }
  if (productsLimited[categoryId].length < limitProduct) {
    productsLimited[categoryId].push(product);
  }
});

  const orderProduct = ids.reduce(
    (current, next, index) => {
      const productFilter = category.find((item) => item.category_id === next);
      const dataProduct = productsLimited[next];

      const productTop = productFilter
        ? { ...productFilter, data: dataProduct }
        : { category_id: null, total: 0, category_name: null, data: [] };
      current[`top${index + 1}`] = productTop;

      return current;
    },
    {}
  );

  return orderProduct;
};

module.exports = {
  createNewProduct,
  updateProduct,
  getTopProductById,
};

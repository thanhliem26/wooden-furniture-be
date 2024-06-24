("use strict");
import {
  createNewCategory,
  updateCategory,
} from "../models/repository/category.repo";
import db from "../models";
const { Op } = require("sequelize");

class CategoryService {
  static UpdateCategory = async (payload) => {
    return await updateCategory(payload);
  };

  static deleteCategory = async (CategoryId) => {
    return await db.Categories.destroy({
      where: {
        id: CategoryId,
      },
    });
  };

  static searchCategory = async (query) => {
    const page = +query.page || 1;
    const limit = query.limit ? +query.limit : null;
    const valueSearch = query.name;

    const queryOptions = {
      where: {
        [Op.or]: [{ name: { [Op.like]: `%${valueSearch}%` } }],
      },
      offset: (page - 1) * limit,
    }

    if (limit !== null) {
      queryOptions.limit = limit;
    }

    return await db.Categories.findAndCountAll(queryOptions);
  };

  static createCategory = async (data) => {
    return await createNewCategory(data);
  };
}

module.exports = CategoryService;

import { BadRequestError } from "../../core/error.response";
import db from "../index";

const validateCategory = async (payload) => {
  const newCategory = await db.Categories.build({
    ...payload,
  });

  return await newCategory.validateCategory();
};

const createNewCategory = async (payload) => {
  const category_isValid = await validateCategory(payload);

  if (category_isValid.status === false) {
    throw new BadRequestError(category_isValid.message);
  }

  try {
    return await db.Categories.create({
      ...payload,
    });
  } catch (e) {
    const [err] = e.errors;

    throw new BadRequestError(err.message);
  }
};

const updateCategory = async (payload) => {
  if (payload.hasOwnProperty("name") && !payload.name) {
    throw new BadRequestError("Category name is not empty!");
  }

  if (!payload.id) {
    throw new BadRequestError("Category id is not empty!");
  }

  return await db.Categories.update(
    { ...payload },
    {
      where: {
        id: payload.id,
      },
    }
  );
};

module.exports = {
  createNewCategory,
  updateCategory,
};

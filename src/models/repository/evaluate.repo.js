import { BadRequestError } from "../../core/error.response";
import db from "../index";

const validateEvaluate = async (payload) => {
  const newEvaluate = await db.Evaluate.build({
    ...payload,
  });

  return await newEvaluate.validateEvaluate();
};

const createNewEvaluate = async (payload) => {
  const evaluate_isValid = await validateEvaluate(payload);

  if (evaluate_isValid.status === false) {
    throw new BadRequestError(evaluate_isValid.message);
  }

  try {
    return await db.Evaluate.create({
      ...payload,
    });
  } catch (e) {
    const [err] = e.errors;

    throw new BadRequestError(err.message);
  }
};

module.exports = {
  createNewEvaluate,
};

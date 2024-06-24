import db from "../index";

const validateUser = async (payload) => {
  const newUser = await db.User.build({
    ...payload,
  });

  return await newUser.validateCreateUser();
};

const createNewUser = async (payload) => {
  return await db.User.create({
    ...payload,
  });
};

const findByEmail = async ({ email }) => {
  return await db.User.findOne({ where: { email }, raw: true });
};

const findById = async (id) => {
  return await db.User.findOne({ where: { id }, raw: true });
};

module.exports = {
  validateUser,
  createNewUser,
  findByEmail,
  findById
};

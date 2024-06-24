import { BadRequestError } from "../../core/error.response";
import db from "../index";

const validateAboutUs = async (payload) => {
  const newAboutUs = await db.AboutUs.build({
    ...payload,
  });

  return await newAboutUs.validateAboutUs();
};

const createNewAboutUs = async (payload) => {
  const aboutUs_valid = await validateAboutUs(payload);
  if (aboutUs_valid.status === false) {
    throw new BadRequestError(aboutUs_valid.message);
  }

  try {
    return await db.AboutUs.create({
      ...payload,
    });
  } catch (e) {
    const [err] = e.errors;

    throw new BadRequestError(err.message);
  }
};

const updateAboutUs = async (payload) => {
  if (!payload.id) {
    throw new BadRequestError("id is required!");
  }

  const about_us = await db.AboutUs.findByPk(payload.id);
  for (let property in payload) {
    about_us[property] = payload[property];
  }

  const about_us_isValid = await about_us.validateAboutUs();
  if (about_us_isValid.status === false) {
    throw new BadRequestError(about_us_isValid.message);
  }

  return await about_us.save();
};

module.exports = {
  createNewAboutUs,
  updateAboutUs,
};

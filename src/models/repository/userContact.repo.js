import { BadRequestError } from "../../core/error.response";
import db from "../index";

const validateUserContact = async (payload) => {
  const newContact = await db.UserContact.build({
    ...payload,
  });

  return await newContact.validateUserContact();
};

const createNewContact = async (payload) => {
  const contact_valid = await validateUserContact(payload);

  if (contact_valid.status === false) {
    throw new BadRequestError(contact_valid.message);
  }

  return await db.UserContact.create({
    ...payload,
  });
};

module.exports = {
  createNewContact,
};

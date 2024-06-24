("use strict");
import { BadRequestError } from "../core/error.response";
import db from "../models";
import {
    createNewContact,
  } from "../models/repository/userContact.repo";
const { Op } = require("sequelize");

class UserService {
  static searchContact = async (query) => {
    const page = +query.page || 1;
    const limit = +query.limit || 10;
    const valueSearch = query.name;

    return await db.UserContact.findAndCountAll({
      where: {
        [Op.or]: [
          { name: { [Op.like]: `%${valueSearch}%` } },
          { email: { [Op.like]: `%${valueSearch}%` } },
          { phone_number: { [Op.like]: `%${valueSearch}%` } },
          { address: { [Op.like]: `%${valueSearch}%` } },
        ],
      },
      limit: limit,
      offset: (page - 1) * limit,
    });
  };

  static createContact = async (data) => {
    return await createNewContact(data);
  };
;
  static updateContact = async (id, is_read) => {
    if(!is_read || !id) {
        throw new BadRequestError('id, is_read is required!')
    }

    return await db.UserContact.update({is_read: is_read},{
        where: {id: id}
    })
  };

    static deleteContact = async (contact_id) => {
    return await db.UserContact.destroy({
        where: {id: contact_id}
    })
  };
}

module.exports = UserService;

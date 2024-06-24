"use strict";

const UserContactService = require("../services/userContact.service");
const {
  OK,
  CREATED,
  SuccessResponse,
  UPDATED,
  DELETED,
} = require("../core/succes.response");

class UserContactController {
  createContact = async (req, res, next) => {
    new CREATED({
      message: "create a new contact success!",
      metadata: await UserContactService.createContact({...req.body, user_id: req?.user?.user_id || null}),
    }).send(res);
  };

  deleteContact = async (req, res, next) => {
    new DELETED({
      message: "delete contact success!",
      metadata: await UserContactService.deleteContact(req.params.id),
    }).send(res);
  };

  searchContact = async (req, res, next) => {
    new DELETED({
      message: "get list contact success!",
      metadata: await UserContactService.searchContact(req.query),
    }).send(res);
  };

  updateContact = async (req, res, next) => {
    new DELETED({
      message: "update contact success!",
      metadata: await UserContactService.updateContact(req.params.id, req.body.is_read),
    }).send(res);
  };

}

module.exports = new UserContactController();

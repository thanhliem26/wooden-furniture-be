"use strict";

const AboutUsService = require("../services/aboutUs.service");
const {
  CREATED,
  SuccessResponse,
  UPDATED,
  DELETED,
} = require("../core/succes.response");

class AboutUsController {
  updateAboutUs = async (req, res, next) => {
    new UPDATED({
      message: "update about us success!",
      metadata: await AboutUsService.UpdateAboutUs(req.body),
    }).send(res);
  };

  deleteAboutUs = async (req, res, next) => {
      new DELETED({
          message: 'delete about us success!',
          metadata: await AboutUsService.deleteAboutUs(req.params.id),
      }).send(res)
  }

  searchAboutUs = async (req, res, next) => {
      new SuccessResponse({
          message: 'get about us list success!',
          metadata: await AboutUsService.searchAboutUs(req.query),
          options: {
              ...req.query
          }
      }).send(res)
  }

  createAboutUs = async (req, res, next) => {
    new CREATED({
      message: "create a new about us success!",
      metadata: await AboutUsService.createAboutUs(req.body),
    }).send(res);
  };

  getActiveAboutUs = async (req, res, next) => {
    new CREATED({
      message: "get about us success!",
      metadata: await AboutUsService.getActiveAbout(),
    }).send(res);
  };
}

module.exports = new AboutUsController();

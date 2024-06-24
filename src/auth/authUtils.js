"use strict";
const { AuthFailureError, NotFoundError, ForbiddenError } = require("../core/error.response");
const asyncHandler = require("../helpers/asyncHandler");
const JWT = require("jsonwebtoken");
const { findByUserId } = require("../services/token.service");
import { validateToken } from "../models/repository/token.repo";

const HEADER = {
  API_KEY: "x-api-key",
  CLIENT_ID: "x-client-id",
  AUTHORIZATION: "authorization",
  REFRESHTOKEN: "x-rtoken-id",
};

const createTokenPair = async (payload, publicKey, privateKey) => {
  try {
    // accessToken
    const accessToken = JWT.sign(payload, publicKey, { expiresIn: "1 days" });
    const refreshToken = JWT.sign(payload, privateKey, { expiresIn: "7 days" });

    //verify token
    JWT.verify(accessToken, publicKey, (err, decode) => {
      if (err) {
        console.error(`error verify::`, err);
      } else {
        console.log(`decode verify::`, decode);
      }
    });

    return { accessToken, refreshToken };
  } catch (error) {
    throw new Error(error);
  }
};

const authentication = asyncHandler(async (req, res, next) => {
  const userId = req.headers[HEADER.CLIENT_ID];
  const accessToken = req.headers[HEADER.AUTHORIZATION];

  if(req.url === '/handleRefreshToken' || (req.url === '/menu-user' && (!userId || !accessToken))) {
    return next();
  }

  if (!userId) throw new AuthFailureError("Invalid Request user_id!");
  
  const keyStore = await findByUserId(userId);
  if (!keyStore) throw new NotFoundError("Not Found keyStore");

  if (!accessToken) throw new AuthFailureError("Inavlid Request access token");

  const isTokenValidate = await validateToken({
    accessToken,
    publicKey: keyStore.publicKey,
  });
  if (isTokenValidate?.message && isTokenValidate?.message === "jwt expired") {
    throw new AuthFailureError(isTokenValidate?.message);
  }

  try {
    const decodeUser = await JWT.verify(accessToken, keyStore.publicKey);

    if (Number(userId) !== Number(decodeUser.user_id))
      throw new AuthFailureError("Invalid UserId");
    req.keyStore = keyStore;
    req.user = decodeUser;

    return next();
  } catch (error) {
    console.log("error::::::::::::", error);
    throw error;
  }
});

const authenticationV2 = asyncHandler(async (req, res, next) => {
  console.log("authentication v2")
  /*
    1 - check userId missing
    1 - get accessToken
    3- verifyToken
    4 - check user in bds
    5 check keyStore with this userId
    6 => return next()
    */
  const userId = req.headers[HEADER.CLIENT_ID];
  if (!userId) throw new AuthFailureError("Invalid Request user_id!");

  const keyStore = await findByUserId(userId);
  if (!keyStore) throw new NotFoundError("Not Found keyStore");

  const refreshToken = req.headers[HEADER.REFRESHTOKEN];
  if (refreshToken) {
    try {
      const decodeUser = JWT.verify(refreshToken, keyStore.privateKey);

      if (Number(userId) !== Number(decodeUser.user_id))
        throw new AuthFailureError("Invalid UserId");
      req.keyStore = keyStore;
      req.user = decodeUser;
      req.refreshToken = refreshToken;

      return next();
    } catch (error) {
      console.log("error", error);
      throw error;
    }
  }
});

const isAdmin = asyncHandler(async (req, res, next) => {
  const userId = req.headers[HEADER.CLIENT_ID];
  if (!userId) throw new AuthFailureError("Invalid Request user_id!");

  const keyStore = await findByUserId(userId);
  if (!keyStore) throw new NotFoundError("Not Found keyStore");

  const accessToken = req.headers[HEADER.AUTHORIZATION];
  if (!accessToken) throw new AuthFailureError("Inavlid Request access token");

  const isTokenValidate = await validateToken({
    accessToken,
    publicKey: keyStore.publicKey,
  });
  if (isTokenValidate?.message && isTokenValidate?.message === "jwt expired") {
    throw new AuthFailureError(isTokenValidate?.message);
  }

  try {
    const decodeUser = await JWT.verify(accessToken, keyStore.publicKey);
    if(+decodeUser.role_user === 1) {
      return next();
    } 
    
    throw new ForbiddenError("You don't have permission!")
    
  } catch (error) {
    console.log("error::::::::::::", error);
    throw error;
  }
});


const verifyJWT = async (token, keySecret) => {
  return await JWT.verify(token, keySecret);
};

module.exports = {
  createTokenPair,
  authentication,
  verifyJWT,
  authenticationV2,
  isAdmin,
};

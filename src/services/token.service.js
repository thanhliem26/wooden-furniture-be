'use strict'

const { Op } = require("sequelize");
import db from '../models';

class keyTokenService {

    static createKeyToken = async ({userId, publicKey, privateKey, refreshToken}) => {
        try {
            const filter = { user_id: userId};
            const update = { publicKey: publicKey, privateKey: privateKey, refreshTokenUsed: JSON.stringify([]), refreshToken: refreshToken};
            const options = { upsert: true }

            const tokens = await db.Token.findOneAndUpdate({filter: filter, values: update, options: options});
 
            return tokens ? tokens.publicKey : null;
        } catch(error) {
            return error;
        }
    }

    static findByUserId = async (user_id) => {
        const key = await db.Token.findOne({where: {user_id}, raw: true});
        return key;
    }

    static removeKeyById = async (id) => {
        return await db.Token.destroy({
            where: {id}
        })
    }

    static findByRefreshTokenUsed =  async (refreshToken) => {
        return await db.Token.findOne({where: {refreshTokenUsed: {[Op.like]: `%${refreshToken}%`} }, raw: true})
    }

    static deleteKeyById = async ( user_id ) => {
        return await db.Token.destroy({
            where: {user_id }
        })
    }

    static findByRefreshTokenByUser = async (refreshToken) => {
        return await db.Token.findOne({where: {refreshToken: refreshToken}})
    }

    static findToken = async (token) => {
        return await db.Token.findOne({where: {token: token}})
    }
}

module.exports = keyTokenService;
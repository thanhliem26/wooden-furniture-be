import db from "../index";
const JWT = require('jsonwebtoken');

const validateToken = async ({accessToken = '', publicKey = ''}) => {
    try {
        const decodeUser = await JWT.verify(accessToken, publicKey)
        return decodeUser;
    } catch(error) {
        // throw error.message;
        return error
    }
};

module.exports = {
    validateToken
};

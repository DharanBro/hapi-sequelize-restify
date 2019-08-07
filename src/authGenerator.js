const JWT = require('jsonwebtoken');
const db = require("./models");
const { sequelize } = db;
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/config/config.json')[env];
const Boom = require('@hapi/boom');

module.exports = async (request) => {
    const options = {};
    options.where = request.payload ? request.payload : null;
    try{
        const record = await sequelize.models["User"].findOne(options);
        if (record) {
            const jwt = JWT.sign(
                { id: record.id, username: record.firstName, scope: "admin" },
                config.secret, { algorithm: 'HS256', expiresIn: "24h" }
            );
            return { "token": jwt, "id": record.id };
        } else {
            return Boom.unauthorized('invalid username/password');;
        }
    }catch (e){
        Boom.badImplementation('server error');
    }
}
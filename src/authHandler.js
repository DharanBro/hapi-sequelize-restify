const hapiJWT = require('hapi-auth-jwt2')
const db = require("./models");
const { sequelize } = db;
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/config/config.json')[env];

// bring your own validation function
const validate = async function (decoded, request) {

    const user = await sequelize.models["User"].findOne({ where: { "id": decoded.id } });
    // do your checks to see if the person is valid
    if (!user) {
        return { isValid: false };
    }
    else {
        return { isValid: true };
    }
};

module.exports = async (server) => {
    await server.register(hapiJWT);

    server.auth.strategy('jwt', 'jwt',
        {
            key: config.secret,
            validate: validate,
            verifyOptions: { algorithms: ['HS256'] }
        });

    server.auth.default('jwt');
}

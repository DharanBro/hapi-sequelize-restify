const addBaseRoutes = require('./src/baseRoutes');

const register = async (server, options) => {
    if (!options.sequelize || !options.sequelize.models) {
        throw new Error("Not a valid sequelize instance. check https://sequelize.org.");
    }
    Object.keys(options.sequelize.models).forEach(addBaseRoutes(server, options.sequelize));
};

const baseRoutes = {
    register,
    name: 'hapi-sequelize-restify'
};

module.exports = baseRoutes;  
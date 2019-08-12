const addBaseRoutes = require('./src/baseRoutes');
const handleAuth = require('./src/authHandler');

const register = async (server, options) => {
    if (!options.sequelize || !options.sequelize.models) {
        throw new Error("Not a valid sequelize instance. check https://sequelize.org.");
    }

    // Add generic routes with REST standards
    addBaseRoutes(server, options)

    // Handle authentication
    if(options.config.authentication){
        await handleAuth(server, options);
    }
};

const baseRoutes = {
    register,
    name: 'hapi-sequelize-restify'
};

module.exports = baseRoutes;  
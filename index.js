const merge = require('deepmerge');
const addBaseRoutes = require('./src/baseRoutes');
const handleAuth = require('./src/authHandler');

const defaultConfig = {
    authentication: {
        identityKey: 'username',
        passcodeKey: 'password',
        authModel: 'User',
        type: 'JWT',
        secret: '1234',
    },
};

const register = async (server, options) => {
    if (!options.sequelize || !options.sequelize.models) {
        throw new Error('Not a valid sequelize instance. check https://sequelize.org.');
    }
    const opts = options;
    opts.config = opts.config || {};

    opts.config = merge(defaultConfig, opts.config);

    // Handle authentication
    if (opts.config.authentication) {
        await handleAuth(server, opts);
    }

    // Add generic routes with REST standards
    addBaseRoutes(server, opts);
};

const baseRoutes = {
    register,
    name: 'hapi-sequelize-restify',
};

module.exports = baseRoutes;

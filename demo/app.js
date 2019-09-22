const Hapi = require('@hapi/hapi');
const restify = require('../');
/* eslint import/no-extraneous-dependencies: ["error", {"peerDependencies": true}] */

const db = require('./models');

const { sequelize } = db;

const init = async () => {
    const server = Hapi.server({
        port: 3000,
        host: 'localhost',
    });

    // sync the model with database
    await sequelize.sync({ force: true });

    await server.register({
        plugin: restify,
        options: { sequelize },
    });

    // console.log('Connection has been established successfully.');

    await server.start();
    // console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (/* err */) => {
    // console.log(err);
    sequelize.close();
    process.exit(1);
});

// Initaiate and start the server
init();

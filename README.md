# hapi-sequelize-restify
Enable REST API with sequelize


# Usage

```
const restify = require('hapi-sequelize-restify');

const db = require("./models");
const { sequelize } = db;

const init = async () => {

    const server = Hapi.server({
        port: 3000,
        host: 'localhost'
    });

    // sync the model with database
    await sequelize.sync();

    await server.register({
        plugin: restify,
        options: { sequelize }
    });

    console.log('Connection has been established successfully.');

    // Add th generic routes to hapi server

    await server.start();
    console.log('Server running on %s', server.info.uri);
};

```

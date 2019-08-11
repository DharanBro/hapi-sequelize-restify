# hapi-sequelize-restify [![CircleCI](https://circleci.com/gh/DharanBro/hapi-sequelize-restify/tree/master.svg?style=svg&circle-token=2da55add1ca756e3b4cc07d018874b0ee9ac38ee)](https://circleci.com/gh/DharanBro/hapi-sequelize-restify/tree/master)
Enable REST API with sequelize

# Swagger Documentation 
https://app.swaggerhub.com/apis-docs/DharanBro/hapi-sequelize_restify_swagger/0.1.0#/


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

const Sequelize = require('sequelize');
const { applyExtraSetup } = require('./extraSetup');
/* eslint import/no-extraneous-dependencies: ["error", {"peerDependencies": true}] */

const env = process.env.NODE_ENV || 'development';
const config = require('../config/config.json')[env];

const db = {};

let sequelize;
if (config.use_env_variable) {
    sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
    sequelize = new Sequelize(config.database, config.username, config.password, config);
}

// eslint-disable-next-line global-require
const modelDefiners = [require('./models/user'), require('./models/post')];

// We define all models according to their files.
modelDefiners.forEach((modelDefiner) => {
    modelDefiner(sequelize);
});

applyExtraSetup(sequelize);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;

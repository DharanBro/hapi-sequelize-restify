const { DataTypes } = require('sequelize');

module.exports = (sequelize) => sequelize.define('Post', {
    title: DataTypes.STRING,
    message: DataTypes.STRING,
}, {});

module.exports = {
    up: (queryInterface, Sequelize) => queryInterface.createTable('Users', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.DataTypes.INTEGER,
        },
        username: {
            type: Sequelize.DataTypes.STRING,
        },
        password: {
            type: Sequelize.DataTypes.STRING,
        },
        firstName: {
            type: Sequelize.DataTypes.STRING,
        },
        lastName: {
            type: Sequelize.DataTypes.STRING,
        },
        email: {
            type: Sequelize.DataTypes.STRING,
        },
        createdAt: {
            allowNull: false,
            type: Sequelize.DataTypes.DATE,
        },
        updatedAt: {
            allowNull: false,
            type: Sequelize.DataTypes.DATE,
        },
    }),
    down: (queryInterface /* , Sequelize */) => queryInterface.dropTable('Users'),
};

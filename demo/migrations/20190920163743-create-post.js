module.exports = {
    up: (queryInterface, Sequelize) => queryInterface.createTable('Posts', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.DataTypes.INTEGER,
        },
        title: {
            type: Sequelize.DataTypes.STRING,
        },
        message: {
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
    down: (queryInterface/* , Sequelize */) => queryInterface.dropTable('Posts'),
};

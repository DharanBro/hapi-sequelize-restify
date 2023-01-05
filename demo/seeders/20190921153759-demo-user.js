const { authenticator } = require('../..');

module.exports = {
    up: async (queryInterface/* , Sequelize */) => queryInterface.bulkInsert('Users', [{
        firstName: 'John',
        lastName: 'Doe',
        email: 'johndoe@demo.com',
        username: 'johndoe',
        password: await authenticator.hashPassword('unlock'),
        createdAt: new Date(),
        updatedAt: new Date(),
    }, {
        firstName: 'Elon',
        lastName: 'musk',
        email: 'elonmusk@demo.com',
        username: 'elonmusk',
        password: await authenticator.hashPassword('spacex'),
        createdAt: new Date(),
        updatedAt: new Date(),
    }, {
        firstName: 'Jeff',
        lastName: 'Bezos',
        email: 'jeffbezos@demo.com',
        username: 'jeffbezos',
        password: await authenticator.hashPassword('amazon'),
        createdAt: new Date(),
        updatedAt: new Date(),
    }], {}),

    down: (queryInterface/* , Sequelize */) => queryInterface.bulkDelete('Users', null, {}),
};

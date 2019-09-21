/* eslint-disable max-len */
module.exports = {
    up: async (queryInterface/* , Sequelize */) => {
        let users = await queryInterface.sequelize.query(
            'SELECT id from Users;',
        );

        [users] = users;

        return queryInterface.bulkInsert('Posts', [{
            title: 'Post 1',
            message: 'Create the highest, grandest vision possible for your life, because you become what you believe',
            UserId: users[0].id,
            createdAt: new Date(),
            updatedAt: new Date(),
        }, {
            title: 'Post 2',
            message: 'When you can’t find the sunshine, be the sunshine',
            UserId: users[0].id,
            createdAt: new Date(),
            updatedAt: new Date(),
        }, {
            title: 'Post 3',
            message: 'The grass is greener where you water it',
            UserId: users[0].id,
            createdAt: new Date(),
            updatedAt: new Date(),
        }, {
            title: 'Post 1',
            message: 'Wherever life plants you, bloom with grace',
            UserId: users[1].id,
            createdAt: new Date(),
            updatedAt: new Date(),
        }, {
            title: 'Post 2',
            message: 'So, what if, instead of thinking about solving your whole life, you just think about adding additional good things. One at a time. Just let your pile of good things grow',
            UserId: users[1].id,
            createdAt: new Date(),
            updatedAt: new Date(),
        }, {
            title: 'Post 3',
            message: 'Little by little, day by day, what is mean for you WILL find its way',
            UserId: users[1].id,
            createdAt: new Date(),
            updatedAt: new Date(),
        }, {
            title: 'Post 1',
            message: 'Don’t forget you’re human. It’s okay to have a meltdown. Just don’t unpack and live there. Cry it out. Then refocus on where you’re headed',
            UserId: users[2].id,
            createdAt: new Date(),
            updatedAt: new Date(),
        }, {
            title: 'Post 2',
            message: 'I am in charge of how I feel and today I am choosing happiness',
            UserId: users[2].id,
            createdAt: new Date(),
            updatedAt: new Date(),
        }, {
            title: 'Post 3',
            message: 'Learn from yesterday, live for today, hope for tomorrow',
            UserId: users[2].id,
            createdAt: new Date(),
            updatedAt: new Date(),
        }], {});
    },

    down: (queryInterface/* , Sequelize */) => queryInterface.bulkDelete('Posts', null, {}),
};

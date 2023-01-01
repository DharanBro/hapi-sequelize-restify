function applyExtraSetup(sequelize) {
    const { User, Post } = sequelize.models;
    Post.belongsTo(User);
}

module.exports = { applyExtraSetup };

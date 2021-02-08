module.exports = (sequelize, Sequelize) => {
    const Film = sequelize.define("film", {
        title: {
            type: Sequelize.STRING,
        },
        description: {
            type: Sequelize.STRING,
        },
        imageUrl: {
            type: Sequelize.STRING,
        },
        status: {
            type: Sequelize.INTEGER,
        }
    });
    return Film;
};
const seedUser = require('./user-seeds');
const seedBooks = require('./books-seeds');

const sequelize = require('../config/connection');

const seedAll = async() => {
    await sequelize.sync({ force: true });
    await seedUser();
    await seedBooks();
};

seedAll();
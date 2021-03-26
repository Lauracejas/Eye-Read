const { User } = require('../models');

const userData = [{
        name: 'Hellen',
        email: 'helen@gmail.com',
        password: 'abcd1234'

    },
    {
        name: 'Alicia',
        email: 'alicia@gmail.com',
        password: '1234abcd'
    },
    {
        name: 'Santi',
        email: 'santi@gmail.com',
        password: '1a2b3c4d'
    }
];

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;
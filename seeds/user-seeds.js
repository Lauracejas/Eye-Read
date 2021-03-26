const { User } = require('../models');

const userData = [{
        name: 'Hellen',
        email: 'helen@gmail.com',
        password: 'abc123'

    },
    {
        name: 'Alicia',
        email: 'alicia@gmail.com',
        password: '123abc'
    },
    {
        name: 'Santi',
        email: 'santi@gmail.com',
        password: '1a2b3c'
    }
];

const seedUsers = () => User.bulkCreate(userData, {
    individualHooks: true, 
    returning: true
});

module.exports = seedUsers;
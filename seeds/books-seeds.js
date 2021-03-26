const { Book } = require('../models');

const bookData = [
    {
        title: "Flowers for Algernon",
        author: "Daniel Keyes",
        publish_date: "2007-12-01",
        reader_id: 1
    },
]

const bookSeed = () => Book.bulkCreate(bookData);

module.exports = bookSeed;
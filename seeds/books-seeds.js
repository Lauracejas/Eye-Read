const { Book } = require('../models');

const bookData = [
    {
        title: "Flowers for Algernon",
        description: "Oscar-winning film Charly starring Cliff Robertson and Claire Bloom-a mentally challenged man receives an operation that turns him into a genius...and introduces him to heartache.",
        image_link: "http://books.google.com/books/content?id=_oG_iTxP1pIC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
        author: "Daniel Keyes",
       // publish_date: "2007-12-01",
        reader_id: 1
    },
]

const bookSeed = () => Book.bulkCreate(bookData);

module.exports = bookSeed;
const router = require("express").Router();
const { Book } = require("../../models");
require('dotenv').config();
const axios = require('axios');


router.post('/', async (req, res) => {
    const { data } = await axios.get('https://www.googleapis.com/books/v1/volumes?q=intitle:' + req.body.search + '&key=' + process.env.GOOGLEBOOKS_APIKEY);
    console.log(data);
    res.json(data);
});

router.post('/', async (req, res) => {
    try {
        const addBook = await Book.create({
            ...req.body,
            user_id: req.session.user_id,
            title: req.body.title,
            image_link: req.body.image_link,
            author: req.body.author,
            publish_date: req.body.publish_date,
            reader_id: req.body.reader_id

        });
        res.status(200).json(addBook);
    } catch (err) {
        res.status(400).json(err);
    }
});


module.exports = router;
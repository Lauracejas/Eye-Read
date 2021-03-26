const router = require("express").Router();
const { Book } = require("../../models");
require('dotenv').config();
const axios = require('axios');


router.post('/', async (req, res) => {
    const { data } = await axios.get('https://www.googleapis.com/books/v1/volumes?q=intitle:'+ req.body.search + '&key=' + process.env.GOOGLEBOOKS_APIKEY);
    console.log(data);
    res.json(data);
})

module.exports = router;
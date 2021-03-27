const router = require("express").Router();
const { Book } = require("../../models");
require("dotenv").config();
const axios = require("axios");

router.post("/", async (req, res) => {
  const { data } = await axios.get(
    "https://www.googleapis.com/books/v1/volumes?q=intitle:" +
      req.body.search +
      "&key=" +
      process.env.GOOGLEBOOKS_APIKEY
  );
  console.log(data);
  res.json(data);
});


// Route that will store book to: WANT TO READ list
router.post("/future", async (req, res) => {
  try {
    const futureBook = await Book.create({
      title: req.body.title,
      description: req.body.description,
      image_link: req.body.image_link,
      author: req.body.author,
      reader_id: req.body.reader_id,
    });
    res.status(200).json(futureBook);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Route that will store book to: ALREADY READ list
router.post("/past", async (req, res) => {
  try {
    const pastBook = await Book.create({
        title: req.body.title,
        description: req.body.description,
        image_link: req.body.image_link,
        author: req.body.author,
        reader_id: req.body.reader_id,
    });
    res.status(200).json(pastBook);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;

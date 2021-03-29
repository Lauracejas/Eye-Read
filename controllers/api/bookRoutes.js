const router = require("express").Router();
const { Book, User } = require("../../models");
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
    const { data } = await axios.get(
      "https://www.googleapis.com/books/v1/volumes/" +
        req.body.id 
    );
    const {volumeInfo} = data;
    const pastBook = await Book.create({
      title: volumeInfo.title,
      image_link: volumeInfo.imageLinks.thumbnail,
      author: volumeInfo.authors[0],
      reader_id: req.session.user_id,
      read: req.body.read,
    });
    //console.log(data);
    res.status(200).json(pastBook);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

router.get("/", async (req, res) => {
  try {
    // Get all Books and JOIN with user data
    const readBookData = await Book.findAll({
      where: { read: true },
      include: [
        {
          model: User,
          attributes: ["name"],
        },
      ],
    });
    // Serialize data so the template can read it
    const readBooks = readBookData.map((book) => book.get({ plain: true }));
    // Pass serialized data and session flag into template
    res.render("profile", {
      readBooks,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/test", async (req, res) => {
  try {
    // Get all Books and JOIN with user data
    // const readBookData = await Book.findAll({
    //   where: { reader_id: false },
    //   include: [
    //     {
    //       model: User,
    //       attributes: ["name"],
    //     },
    //   ],
    // });
    const bookData = await User.findByPk(req.session.user_id, {
      include: [Book]
      
    })
    console.log(bookData, 'here');
    // Serialize data so the template can read it
  //
    // Pass serialized data and session flag into template
    // res.render("profile", {
    //   unreadBooks,
    //   logged_in: req.session.logged_in,
    // });
    res.json(bookData)
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});


module.exports = router;

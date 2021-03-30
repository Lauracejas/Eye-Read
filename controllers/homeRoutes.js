const router = require("express").Router();
const { Book, User } = require("../models");
const withAuth = require("../utils/auth");
require("dotenv").config();
const axios = require("axios");


router.get("/profile", withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ["password"] },
      include: [Book],
    });

    const user = userData.get({ plain: true });

    res.render("profile", {
      user,
      logged_in: true,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/login", (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect("/profile");
    return;
  }
  res.render("login");
});

router.get("/", withAuth, async (req, res) => {
  try {
    const userData = await User.findAll({
      include: [
        {
          model: Book,
          attributes: ["title", "description", "book_link", "image_link", "author"],
        },
      ],
    });
    // Serialize data so the template can read it
    const users = userData.map((user) => user.get({ plain: true }));
    res.render("search", {
      books: [],
      users,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/search/:search", withAuth, async (req, res) => {
  console.log('route', req.params.search)
  try {    
    const { data } = await axios.get(
      "https://www.googleapis.com/books/v1/volumes?q=intitle:" +
      req.params.search +
      "&key=" +
      process.env.GOOGLEBOOKS_APIKEY
    );
    console.log('HELLO');
      const booksArray = data.items.map(book => {
      let thumb
      if (book.volumeInfo.imageLinks === undefined) {
        //console.log("here here")
        thumb = "http://dummy-images.com/abstract/dummy-50x50-Goemetry.jpg";
      }else{
        thumb = book.volumeInfo.imageLinks.thumbnail
      }

      return {
        title: book.volumeInfo.title,
        description: book.volumeInfo.description,
        thumbnail: thumb,
        id: book.id,
        authors: book.volumeInfo.authors,
      };
    })
    // Pass serialized data and session flag into template
    res.render("search", {
      books: booksArray,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
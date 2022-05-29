//this file will contain all the user-facing routes: homepage and login page

//set up the main homepage route
const router = require("express").Router();
const { Post, User, Comment } = require("../models");

//GET api/home for logged in users
router.get("/", (req, res) => {
  console.log(req.session);

  Post.findAll({
    include: [
      {
        model: Comment,
      },
      {
        model: User,
      },
    ],
  })
    .then((dbPostData) => {
      // pass a single post object into the homepage template
      //   console.log(dbPostData[0]);

      const posts = dbPostData.map((post) => post.get({ plain: true }));

      res.render("homepage", {
        posts,
        loggedIn: req.session.loggedIn,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});


//GET /single post for logged in user
router.get("/post/:id", (req, res) => {
  Post.findOne({
    where: {
      id: req.params.id,
    },

    include: [
      User,
      {
        model: Comment,
        include: {
          model: User,
        },
      },
    ],
  })
    .then((dbPostData) => {
      if (!dbPostData) {
        res.status(404).json({ message: "No post found with this id" });
        return;
      }
      // serialize the data
      const post = dbPostData.get({ plain: true });
      console.log(post);
      // pass data to template
      res.render("single-post", {
        post,
        loggedIn: req.session.loggedIn,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});


//GET /login
router.get("/login", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }
  res.render("login");
});


//GET /signup
router.get("/signup", (req, res) => {
  // if (req.session.loggedIn) {
  //   res.redirect("/");
  //   return;
  // }
  res.render("signup");
});


module.exports = router;

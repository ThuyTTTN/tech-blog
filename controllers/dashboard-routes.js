const router = require("express").Router();
const sequelize = require("../config/connection");
const { Post, User, Comment } = require("../models");
const withAuth = require("../utils/auth");

//GET /users
router.get("/", withAuth, (req, res) => {
  Post.findAll({
    where: {
      // use the ID from the session
      user_id: req.session.user_id,
    },
    attributes: [
      'id',
      'title',
      'post_body',
      'createdAt'
  ],
  include: [
      {
          model: Comment,
          attributes: ['id', 'comment_text', 'post_id', 'user_id', 'createdAt'],
          include: {
              model: User,
              attributes: ['username']
          }
      },
      {
          model: User,
          attributes: ['username']
      }
  ]
})
    .then((dbPostData) => {
      // serialize data before passing to template
      const post = dbPostData.map((post) => post.get({ plain: true }));
      res.render("dashboard", { post, loggedIn: req.session.loggedIn });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});  

router.get("/edit/:id", withAuth, (req, res) => {
  Post.findOne( {
    where: {
      id: req.params.id
    },
    attributes: [
      'id',
      'title',
      'post_body',
      'createdAt'
  ],
  include: [
      {
          model: Comment,
          attributes: [
              'id', 'comment_text', 'post_id',
               'user_id', 'createdAt'
          ],
          include: {
              model: User,
              attributes: ['username']
          }
      },
      {
          model: User,
          attributes: ['username']
      }
  ]
})
    .then((dbPostData) => {
      if (dbPostData) {
        const post = dbPostData.get({ plain: true });

        res.render("edit-post", {
          post,
          loggedIn: true,
        });
      } else {
        res.status(404).end();
      }
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

//GET - create a new post
// router.get("/create", (req, res) => {
//   Post.findAll({
//     where: {
//       user_id: req.session.user.id,
//     },
//   })
//     .then((dbPostData) => {
//       //  serialize data for front-end
//       const post = dbPostData.map((post) => post.get({ plain: true }));
//       res.render("create-post", { post, loggedIn: true });
//     })
//     .catch((err) => {
//       console.log(err);
//       res.status(500).json(err);
//     });
// });

module.exports = router;

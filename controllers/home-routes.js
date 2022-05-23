//this file will contain all the user-facing routes: homepage and login page

//set up the main homepage route
const router = require('express').Router();

const sequelize = require('../config/connection');
const { Post, User, Comment } = require('../models');


router.get('/', (req, res) => {
    // res.render('homepage', {
    //   id: 1,
    //   post_url: 'https://handlebarsjs.com/guide/',
    //   title: 'Handlebars Docs',
    //   created_at: new Date(),
    //   comments: [{}, {}],
    //   user: {
    //     username: 'test_user'
    //   },
    // });

    Post.findAll({
        attributes: [
          'id',
          'post_url',
          'title',
          'created_at'
        ],
        include: [
          {
            model: Comment,
            attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
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
        .then(dbPostData => {
          // pass a single post object into the homepage template
        //   console.log(dbPostData[0]);

        const posts = dbPostData.map(post => post.get({ plain: true }));

          res.render('homepage', { posts });
        })
        .catch(err => {
          console.log(err);
          res.status(500).json(err);
        });

  });

router.get('/login', (req, res) => {
    res.render('login');
});

module.exports = router;
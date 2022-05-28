const router = require("express").Router();
const { Comment } = require("../../models");
const withAuth = require("../../utils/auth");

//GET all comments
router.get('/', (req, res) => {
  Comment.findAll()
    .then(dbCommentData => res.json(dbCommentData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

//POST a new comment
router.post("/", withAuth, (req, res) => {
  // check the session
  Comment.create({
    // ...req.body,
    username: req.body.username,
    comment_text: req.body.comment_text,
    user_id: req.session.user_id,post_id: req.body.post_id,
    
  })
    .then((dbCommentData) => res.json(dbCommentData))
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

//PUT update a comment
// router.put("/:id", withAuth, (req, res) => {
//   Comment.update(
//     {
//       comment_text: req.body.comment_text,
//     },
//     {
//       where: {
//         id: req.params.id,
//       },
//     }
//   )
//     // send the response
//     .then((dbCommentData) => {
//       if (!dbCommentData) {
//         res.status(404).json({ message: "No comment found with this id" });
//         return;
//       }
//       res.json(dbCommentData);
//     })
//     // catch any errors
//     .catch((err) => {
//       console.log(err);
//       res.status(500).json(err);
//     });
// });

//DELETE a comment
router.delete("/:id", withAuth, (req, res) => {
  Comment.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((dbCommentData) => {
      if (!dbCommentData) {
        res.status(404).json({ message: "No comment found with this id!" });
        return;
      }
      res.json({ message: "No comment found with this id!" });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;

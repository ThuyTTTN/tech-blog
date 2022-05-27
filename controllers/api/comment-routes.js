const router = require("express").Router();
const { Comment } = require("../../models");
const withAuth = require("../../utils/auth");

//POST a new comment
router.post("/", withAuth, (req, res) => {
  // check the session
  Comment.create({
    ...req.body,
    user_id: req.session.user_id,
  })
    .then((dbCommentData) => res.json(dbCommentData))
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

//PUT update a comment
router.put("/:id", withAuth, (req, res) => {
  Comments.update(
    {
      content: req.body.content,
    },
    {
      where: {
        id: req.params.id,
      },
    }
  )
    // send the response
    .then((dbCommentData) => {
      if (!dbCommentData) {
        res.status(404).json({ message: "No comment found with this id" });
        return;
      }
      res.json(dbCommentData);
    })
    // catch any errors
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

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

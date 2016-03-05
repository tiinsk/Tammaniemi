const Event = require('../models/event');
const Comment = require('../models/comment');
const passport = require('./passport.js');

module.exports = (app) => {
  /*
   * Add new Comment
   */
  app.post('/api/comments', passport.authenticate('jwt', {
    session: false
  }), (req, res) => {
    const addComment = req.body;
    addComment.userId = req.user._id;

    if (addComment.eventId === undefined || addComment.content === undefined) {
      res.status(400).send({
        message: 'Invalid comment data'
      });
      return;
    }

    Event.findById(addComment.eventId, (err, event) => {
      if (err) {
        res.status(500).send({
          message: 'Event not found'
        });
        return;
      }
      if (event === null) {
        res.status(404).send({
          message: 'Event not found'
        });
        return;
      }

      const newComment = new Comment(addComment);

      newComment.save((err, comment) => {
        if (err) {
          res.status(500).send({
            message: 'Creation failed'
          });
          return;
        }

        event.update({
          $push: {
            comments: comment._id
          }
        }, (err) => {
          if (err) {
            res.send(500);
            return;
          }
          res.status(201).json(comment);
        });
      });
    });
  });

  app.put('/api/comments/:commentId', passport.authenticate('jwt', {
    session: false
  }), (req, res) => {
    const updatedComment = req.body;

    if (updatedComment.eventId === undefined ||
        updatedComment.userId === undefined ||
        updatedComment.content === undefined) {
      res.status(400).send({
        message: 'Invalid comment data'
      });
      return;
    }

    Comment.findById(updatedComment._id, (err, comment) => {
      if (err) {
        res.send(500);
        return;
      }

      if (!comment) {
        res.status(404).send({
          message: 'Comment not found'
        });
        return;
      }

      if (!req.user._id.equals(comment.userId)) {
        res.status(403).send({
          message: 'Unauthorized'
        });
        return;
      }

      comment.update(updatedComment, (err) => {
        if (err) {
          res.send(500);
          return;
        }
        res.send(200);
      });
    });
  });

  app.delete('/api/comments/:commentId', passport.authenticate('jwt', {
    session: false
  }), (req, res) => {
    Comment.findById(req.params.commentId, (err, comment) => {
      if (err) {
        res.send(500);
        return;
      }

      if (!comment) {
        res.status(404).send({
          message: 'Comment not found'
        });
        return;
      }

      if (!req.user._id.equals(comment.userId)) {
        res.status(403).send({
          message: 'Unauthorized'
        });
        return;
      }


      comment.remove((err) => {
        if (err) {
          res.send(500);
          return;
        }
        res.send(200);
      });
    });
  });
};

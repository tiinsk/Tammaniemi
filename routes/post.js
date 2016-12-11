const Post = require('../models/post');
const passport = require('./passport.js');

module.exports = (app) => {
  /*
   * GET all posts
   */
  app.get('/api/Post', passport.authenticate('jwt', {
    session: false
  }), (req, res) => {
    Post.find({})
    .populate({
      path: 'comments',
      populate: {
        path: 'userId'
      }
    })
    .populate('userId')
    .exec((err, posts) => {
      if (err) {
        res.sendStatus(500);
        return;
      }
      if (posts.length === 0) {
        res.status(404).send({
          message: 'No posts found'
        });
        return;
      }
      res.json(posts);
    });
  });

  /*
   * GET post information
   */
  app.get('/api/Post/:postId', passport.authenticate('jwt', {
    session: false
  }), (req, res) => {
    Post.findById(req.params.postId, '_id title content comments userId createdAt')
    .populate({
      path: 'comments',
      populate: {
        path: 'userId'
      }
    })
    .populate('userId')
    .exec((err, post) => {
      if (err) {
        res.status(500).send({
          message: 'Post not found'
        });
        return;
      }
      if (post === null) {
        res.status(404).send({
          message: 'Post not found'
        });
        return;
      }
      res.json(post);
    });
  });

  /*
   * POST add new post
   */
  app.post('/api/Post', passport.authenticate('jwt', {
    session: false
  }), (req, res) => {
    const addPost = req.body;
    addPost.userId = req.user._id;

    if (addPost.title === undefined || addPost.content === undefined) {
      res.status(400).send({
        message: 'Invalid post data'
      });
      return;
    }

    const newPost = new Post(addPost);

    newPost.save((err, post) => {
      if (err) {
        res.status(500).send({
          message: 'Creation failed'
        });
        return;
      }

      res.status(201).json(post);
    });
  });

  /*
   * PUT update post
   */
  app.put('/api/Post/:postId', passport.authenticate('jwt', {
    session: false
  }), (req, res) => {
    const updatedPost = req.body;

    if (updatedPost.title === undefined || updatedPost.content === undefined) {
      res.status(400).send({
        message: 'Invalid post data'
      });
      return;
    }

    Post.findById(req.params.postId, (err, post) => {
      if (err) {
        res.sendStatus(500);
        return;
      }

      if (!post) {
        res.status(404).send({
          message: 'Post not found'
        });
        return;
      }

      if (!req.user.isAllowedToEdit(post)) {
        res.status(403).send({
          message: 'Unauthorized'
        });
        return;
      }

      post.update(updatedPost, (err) => {
        if (err) {
          res.sendStatus(500);
          return;
        }
        res.sendStatus(200);
      });
    });
  });

  /*
   * DELETE post
   */
  app.delete('/api/Post/:postId', passport.authenticate('jwt', {
    session: false
  }), (req, res) => {
    Post.findById(req.params.postId, (err, post) => {
      if (err) {
        res.sendStatus(500);
        return;
      }

      if (!post) {
        res.status(404).send({
          message: 'Post not found'
        });
        return;
      }

      if (!req.user.isAllowedToEdit(post)) {
        res.status(403).send({
          message: 'Unauthorized'
        });
        return;
      }

      post.remove((err) => {
        if (err) {
          res.sendStatus(500);
          return;
        }
        res.sendStatus(200);
      });
    });
  });
};

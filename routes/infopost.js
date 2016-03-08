const InfoPost = require('../models/infopost');
const passport = require('./passport.js');

module.exports = (app) => {
  app.get('/api/infoposts', passport.authenticate('jwt', {
    session: false
  }), (req, res) => {
    InfoPost.find({})
    .populate('comments')
    .populate('userId')
    .exec((err, infoposts) => {
      if (err) {
        res.send(500);
        return;
      }

      if (infoposts.length === 0) {
        res.status(404).send({
          message: 'No infoposts found'
        });
        return;
      }
      res.json(infoposts);
    });
  });

  /*
   * GET post information
   */
  app.get('/api/infoposts/:infopostId', passport.authenticate('jwt', {
    session: false
  }), (req, res) => {
    InfoPost.findById(req.params.infopostId, '_id title category content comments userId createdAt')
      .populate('comments')
      .populate('userId')
      .exec((err, infopost) => {
        if (err) {
          res.status(500).send({
            message: 'Infopost not found'
          });
          return;
        }
        if (infopost === null) {
          res.status(404).send({
            message: 'Infopost not found'
          });
          return;
        }
        res.json(infopost);
      });
  });

  /*
   * POST add new post
   */
  app.post('/api/infoposts', passport.authenticate('jwt', {
    session: false
  }), (req, res) => {
    const addInfoPost = req.body;
    addInfoPost.userId = req.user._id;

    if (addInfoPost.title === undefined || addInfoPost.content === undefined) {
      res.status(400).send({
        message: 'Invalid infopost data'
      });
      return;
    }

    const newInfoPost = new InfoPost(addInfoPost);

    newInfoPost.save((err, infopost) => {
      if (err) {
        res.status(500).send({
          message: 'Creation failed'
        });
        return;
      }

      res.status(201).json(infopost);
    });
  });

  /*
   * PUT update post
   */
  app.put('/api/infoposts/:infopostId', passport.authenticate('jwt', {
    session: false
  }), (req, res) => {
    const updatedInfoPost = req.body;

    if (updatedInfoPost.title === undefined || updatedInfoPost.content === undefined) {
      res.status(400).send({
        message: 'Invalid infopost data'
      });
      return;
    }

    InfoPost.findById(req.params.infopostId, (err, infopost) => {
      if (err) {
        res.send(500);
        return;
      }

      if (!infopost) {
        res.status(404).send({
          message: 'Infopost not found'
        });
        return;
      }

      if (!req.user._id.equals(infopost.userId)) {
        res.status(403).send({
          message: 'Unauthorized'
        });
        return;
      }

      infopost.update(updatedInfoPost, (err) => {
        if (err) {
          res.send(500);
          return;
        }
        res.send(200);
      });
    });
  });

  /*
   * DELETE infopost
   */
  app.delete('/api/infoposts/:infopostId', passport.authenticate('jwt', {
    session: false
  }), (req, res) => {
    InfoPost.findById(req.params.infopostId, (err, infopost) => {
      if (err) {
        res.send(500);
        return;
      }

      if (!infopost) {
        res.status(404).send({
          message: 'Infopost not found'
        });
        return;
      }

      if (!req.user._id.equals(infopost.userId)) {
        res.status(403).send({
          message: 'Unauthorized'
        });
        return;
      }

      infopost.remove((err) => {
        if (err) {
          res.send(500);
          return;
        }
        res.send(200);
      });
    });
  });
};

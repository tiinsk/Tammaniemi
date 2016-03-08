const User = require('../models/user');
const passport = require('./passport.js');

module.exports = (app) => {
  /*
   * GET all user information
   */
  app.get('/api/users', passport.authenticate('jwt', {
    session: false
  }), (req, res) => {
    User.find({}, (err, users) => {
      if (err) {
        res.sendStatus(500);
        return;
      }
      if (users === null) {
        res.status(404).send({
          message: 'No users found'
        });
        return;
      }
      res.json(users);
    });
  });

  /*
   * GET user information
   */
  app.get('/api/users/:userId', passport.authenticate('jwt', {
    session: false
  }), (req, res) => {
    User.findById(req.params.userId, '_id name email password', (err, user) => {
      if (err) {
        res.sendStatus(500);
        return;
      }
      if (user === null) {
        res.status(404).send({
          message: 'User not found'
        });
        return;
      }
      res.json(user);
    });
  });

  /*
   * POST add new user
   */
  app.post('/api/users', (req, res) => {
    const addUser = req.body;

    if (addUser.name === undefined ||
        addUser.password === undefined ||
        addUser.email === undefined) {
      res.status(400).send({
        message: 'Invalid user data'
      });
      return;
    }

    User.findOne({
      email: addUser.email
    }, (err, user) => {
      if (err) {
        res.sendStatus(500);
        return;
      }

      if (user) {
        res.status(403).send({
          message: 'User already exists'
        });
        return;
      }

      const newUser = new User(addUser);

      newUser.save((err, user) => {
        if (err) {
          res.status(500).send({
            message: 'Creation failed'
          });
          return;
        }
        res.json(user);
      });
    });
  });

  /*
   * PUT update user information
   */
  app.put('/api/users/:userId', passport.authenticate('jwt', {
    session: false
  }), (req, res) => {
    const updatedUser = req.body;

    User.findById(req.params.userId, (err, user) => {
      if (err) {
        res.sendStatus(500);
        return;
      }

      if (!user) {
        res.status(404).send({
          message: 'User not found'
        });
        return;
      }

      if (req.user.username !== user.username) {
        res.send(403);
        return;
      }

      if (updatedUser.email === undefined ||
          updatedUser.name === undefined) {
        res.send(400);
        return;
      }

      user.update(updatedUser, (err) => {
        if (err) {
          res.sendStatus(500);
          return;
        }
        res.send(200);
      });
    });
  });

  /*
   * DELETE user
   */
  app.delete('/api/users/:userId', passport.authenticate('jwt', {
    session: false
  }), (req, res) => {
    User.findOne({
      userId: req.params.userId
    }, (err, user) => {
      if (err) {
        res.sendStatus(500);
        return;
      }

      if (!user) {
        res.status(404).send({
          message: 'User not found'
        });
        return;
      }

      if (req.user.username !== user.username) {
        res.send(403);
        return;
      }

      user.remove((err) => {
        if (err) {
          res.sendStatus(500);
          return;
        }
        req.logout();
        res.send(200);
      });
    });
  });
};

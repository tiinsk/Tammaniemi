const User = require('../models/user');
const AuthToken = require('../models/authtoken');
const passport = require('./passport.js');
const jwt = require('jsonwebtoken');
const config = require('../config');

module.exports = (app) => {
  /*
   * GET all user information
   */
  app.get('/api/users', passport.authenticate('jwt', {
    session: false
  }), (req, res, next) => {
    User.find({
      deleted: false
    }, '_id name createdAt email')
      .exec()
      .then((users) => {
        if (users === null) {
          throw new Error('No users found');
        }
        res.json(users);
      })
      .then(null, next);
  });

  /*
   * GET user information
   */
  app.get('/api/users/:userId', passport.authenticate('jwt', {
    session: false
  }), (req, res, next) => {
    User.findOne({
      _id: req.params.userId,
      deleted: false
    })
      .exec()
      .then((user) => {
        if (user === null) {
          throw new Error('User not found');
        }
        res.json(user);
      })
      .then(null, next);
  });

  /*
   * POST add new user
   */
  app.post('/api/users', (req, res, next) => {
    const addUser = req.body.user;
    const jwtToken = req.body.token;
    if (!jwtToken) {
      next(Error('Token must exist'));
    }

    const jwtPayload = jwt.verify(jwtToken, config.jwt[process.env.NODE_ENV].inviteSecret);
    const token = jwtPayload.jti;

    if (addUser.email !== jwtPayload.email) {
      next(Error('Email does not match to token email'));
    }

    AuthToken.findOne({
      token
    }).exec()
      .then((token) => {
        if (token && token.isValid()) {
          return User.findOne({
            email: addUser.email
          }).exec();
        }
        throw new Error('Invalid token');
      })
      .then((user) => {
        if (user) {
          throw new Error('User exists');
        }

        addUser.role = 'user';
        const newUser = new User(addUser);
        if (newUser.validateSync()) {
          throw new Error('Incorrect user data');
        }

        return newUser.save();
      })
      .then((user) => {
        res.json({
          name: user.name,
          email: user.email,
          _id: user._id
        });
      })
      .then(() => AuthToken.findOneAndUpdate({
          token
        }, {active: false})
          .exec()
      )
      .then(null, next);
  });

  /*
   * PUT update user information
   */
  app.put('/api/users/:userId', passport.authenticate('jwt', {
    session: false
  }), (req, res, next) => {
    const updatedUser = req.body;

    User.findOne({
      _id: req.params.userId,
      deleted: false
    })
      .exec()
      .then((user) => {
        if (!user) {
          throw new Error('User does not exist');
        }

        if (req.user.email !== user.email) {
          throw new Error('Can not update other users');
        }
        updatedUser.role = 'user';
        if (updatedUser.password) {
          user.password = updatedUser.password;
        }
        user.name = updatedUser.name;
        return user.save();
      })
      .then((user) => {
        res.json({
          name: user.name,
          email: user.email,
          _id: user._id
        });
      })
      .then(null, next);
  });

  /*
   * DELETE user
   */
  app.delete('/api/users/:userId', passport.authenticate('jwt', {
    session: false
  }), (req, res, next) => {
    User.findById(req.params.userId)
      .exec()
      .then((user) => {
        if (!user) {
          throw new Error('User not found');
        }

        if (!req.user.isAdmin() && req.user.email !== user.email) {
          throw new Error('Can not delete other users');
        }

        user.delete();
        return user.save();
      })
      .then((user) => {
        req.logout();
        res.sendStatus(201);
      })
      .then(null, next);
  });
};

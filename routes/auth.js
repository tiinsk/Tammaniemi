const config = require('../config');
const passport = require('./passport.js');
const jwt = require('jsonwebtoken');

module.exports = (app) => {
  app.post('/api/login', (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
      if (err) {
        return next(err);
      }
      if (!user) {
        return res.json(401, {
          error: info.message
        });
      }

      const token = jwt.sign({
        name: user.name,
        id: user._id
      }, config.jwt[process.env.NODE_ENV].secret);

      res.cookie('JWT', token, {
        httpOnly: true
      });

      return res.json(user);
    })(req, res, next);
  });

  app.get('/api/logout', (req, res) => {
    res.clearCookie('JWT', {
      httpOnly: true
    });
    res.sendStatus(200);
  });

  app.get('/api/account', passport.authenticate('jwt', {
    session: false
  }), (req, res) => {
    if (req.user) {
      return res.json(req.user);
    }

    return res.sendStatus(401);
  });
};

'use strict';

const config = require('../config');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const User = require('../models/user');

function authUser(email, password, done) {
  User.findOne({
    email
  }, (err, user) => {
    if (err) {
      return done(err);
    }
    if (!user) {
      return done(null, null, {
        message: 'Incorrect username.'
      });
    }
    if (user.isDeleted()) {
      return done(null, null, {
        message: 'User is deleted'
      });
    }

    user.comparePassword(password, (err, isMatch) => {
      if (err) {
        return done(err);
      } else if (isMatch) {

        user.password = '';
        return done(null, user);
      }
      return done(null, null, {
        message: 'Incorrect email'
      });
    });
  });
}

function authUserJWT(jwtPayload, done) {
  User.findOne({
    _id: jwtPayload.id,
    deleted: false
  }, '_id name createdAt email role', (err, user) => {
    if (err) {
      return done(err, false);
    }
    if (user) {
      return done(null, user);
    }
    return done(null, false);
  });
}

function cookieExtract(req) {
  let token = null;
  if (req && req.cookies) {
    token = req.cookies.JWT;
  }
  return token;
}


passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password'
}, authUser));

const opts = {};
opts.secretOrKey = config.jwt[process.env.NODE_ENV].secret;
opts.ignoreExpiration = config.jwt[process.env.NODE_ENV].ignoreExpiration;
opts.jwtFromRequest = cookieExtract;
passport.use(new JwtStrategy(opts, authUserJWT));

module.exports = passport;

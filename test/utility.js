const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt-nodejs');
const config = require('../config');

function getUserCookie(user) {
  return jwt.sign({
    name: user.name,
    id: user._id
  }, config.jwt[process.env.NODE_ENV].secret);
}

function generateToken() {
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(Date.now(), salt);
  return (new Buffer(hash)).toString('base64');
}

function generateJWTInviteToken(email, authToken) {
  return jwt.sign({
    email
  }, config.jwt[process.env.NODE_ENV].inviteSecret, {
    jwtid: authToken
  });
}

export {getUserCookie, generateToken, generateJWTInviteToken};

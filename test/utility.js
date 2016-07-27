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

export { getUserCookie, generateToken };

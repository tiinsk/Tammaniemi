const jwt = require('jsonwebtoken');
const config = require('../config');

function getUserCookie(user) {
  return jwt.sign({
    name: user.name,
    id: user._id
  }, config.jwt[process.env.NODE_ENV].secret);
}

export { getUserCookie };

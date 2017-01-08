const AuthToken = require('../models/authtoken.js');
const bcrypt = require('bcrypt-nodejs');
const SALT_WORK_FACTOR = 10;
const config = require('../config');
const jwt = require('jsonwebtoken');

/*
 * Generate new authToken
 */
function createToken() {
  const salt = bcrypt.genSaltSync(SALT_WORK_FACTOR);
  const hash = bcrypt.hashSync(Date.now(), salt);

  const encoded = (new Buffer(hash)).toString('base64');
  const newAuth = new AuthToken({
    token: encoded
  });

  return newAuth.save();
}

function generateJWTInviteToken(email) {
  return createToken()
    .then(({token}) => {
      return jwt.sign({
        email
      }, config.jwt[process.env.NODE_ENV].inviteSecret, {
        jwtid: token
      });
    });
}

function validateToken(token) {
  return AuthToken.findOne({
    token
  }).exec()
    .then((token) => {
      if (!token) {
        return Promise.reject();
      }

      return token.isValid() ? Promise.resolve() : Promise.reject();
    });
}

module.exports = {
  createToken,
  generateJWTInviteToken,
  validateToken
};

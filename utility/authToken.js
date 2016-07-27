const AuthToken = require('../models/authtoken.js');
const bcrypt = require('bcrypt-nodejs');
const SALT_WORK_FACTOR = 10;

module.exports = {
  /*
   * Generate new authToken
   */
  createToken() {
    const salt = bcrypt.genSaltSync(SALT_WORK_FACTOR);
    const hash = bcrypt.hashSync(Date.now(), salt);

    const encoded = (new Buffer(hash)).toString('base64');
    const newAuth = new AuthToken({
      token: encoded
    });

    return newAuth.save();
  },

  validateToken(token) {
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
};

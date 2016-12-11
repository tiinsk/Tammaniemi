const mongoose = require('mongoose');
const moment = require('moment');

const authTokenSchema = new mongoose.Schema({
  token: {
    type: String,
    required: true
  },
  validUntil: {
    type: Date,
    required: true,
    default() {
      const now = new Date();
      now.setHours(now.getHours() + 4);

      return now;
    }
  },
  active: {
    type: Boolean,
    default: true
  }
});

authTokenSchema.methods.isValid = function () {
  const now = moment();
  return now.isBefore(this.validUntil) && this.active;
};

module.exports = mongoose.model('AuthToken', authTokenSchema);

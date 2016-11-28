const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
const SALT_WORK_FACTOR = 10;

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now
  },
});

userSchema.pre('save', function(next) {
  const user = this;

  // only hash the password if it has been modified (or is new)
  if (!user.isModified('password')) next();

  // generate a salt
  bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
    if (err) {
      next(err);
    }

    // hash the password using our new salt
    bcrypt.hash(user.password, salt, null, (err, hash) => {
      if (err) next(err);
      // override the cleartext password with the hashed one
      user.password = hash;
      next();
    });
  });
});

userSchema.methods.comparePassword = function(candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
    if (err) cb(err);
    cb(null, isMatch);
  });
};

userSchema.methods.isPasswordValid = function(candidatePassword) {
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
    isMatch();
  });
};

module.exports = mongoose.model('User', userSchema);

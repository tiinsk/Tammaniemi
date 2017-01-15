const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
const SALT_WORK_FACTOR = 10;

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  deleted: {
    type: Boolean,
    required: true,
    default: false
  },
  role: {
    type: String,
    required: true,
    default: 'user'
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

userSchema.methods.isPasswordValidSync = function(candidatePassword) {
  return bcrypt.compareSync(candidatePassword, this.password);
};

userSchema.methods.isAdmin = function() {
  return this.role === 'admin';
}
userSchema.methods.isDeleted = function() {
  return this.deleted;
}

userSchema.methods.delete = function() {
  return this.deleted = true;
}

userSchema.methods.isAllowedToEdit = function(event) {
  return this.role === 'admin' || this._id.equals(event.userId)
}


userSchema.set('toJSON', { transform: (doc, ret) => {
  delete ret.password;
  delete ret.deleted;

  ret.__t = 'User';

  return ret;
}});

module.exports = mongoose.model('User', userSchema);

const mongoose = require('mongoose');

const photosetSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now
  },
  flickrId: {
    type: String,
    required: true
  },
  primaryPhotoUrl: {
    type: String,
    required: true,
  },
  photos: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Photo'
  }]
});

photosetSchema.set('toJSON', {
  transform: (doc, ret) => {
    ret.__t = 'Photoset';
    return ret;
  }
});

module.exports = mongoose.model('Photoset', photosetSchema);

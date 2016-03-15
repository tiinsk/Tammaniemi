const mongoose = require('mongoose');
const Event = require('./event');

const taskSchema = Event.discriminator('Task', new mongoose.Schema({
  category: {
    type: Number,
    required: true,
    default: 1
  },
  isDone: {
    type: Boolean,
    required: true,
    default: false
  },
  doneByUser: {
    type: mongoose.Schema.Types.ObjectId,
    required: false,
    ref: 'User'
  }

}));

module.exports = mongoose.model('Task', taskSchema);

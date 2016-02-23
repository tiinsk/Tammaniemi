const mongoose = require('mongoose');
const Event = require('./event');
const async = require('async');

const reservationSchema = Event.discriminator('Reservation', new mongoose.Schema({
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
}));

reservationSchema.pre('validate', (next, done) => {
  const reservation = this;
  if (reservation.endDate < reservation.startDate) {
    done(new Error('End date cannot be before start date'));
  }

  async.parallel([
    function findBeforeAfter(callback) {
      mongoose.models.Reservation
        .find()
        .where('startDate').gt(reservation.startDate)
        .or('endDate').lt(reservation.endDate).count(callback);
    },
    function findAll(callback) {
      mongoose.models.Reservation
        .findAll().count(callback);
    },
  ], (err, results) => {
    if (results[0] !== results[1]) {
      done(new Error('Overlapping reservation'));
    }

    next();
  });
});

module.exports = mongoose.model('Reservation', reservationSchema);

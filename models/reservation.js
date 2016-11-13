const mongoose = require('mongoose');
const Event = require('./event');
const async = require('async');

const reservationSchema = new mongoose.Schema({
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
});

reservationSchema.pre('validate', function(next) {
  const reservation = this;
  if (reservation.endDate < reservation.startDate) {
    next(new Error('End date cannot be before start date'));
  }

  async.parallel([
    (cb) => {
      mongoose.models.Reservation
        .find({
          $or: [
            {
              startDate: {
                $gt: reservation.endDate
              }
            },
            {
              endDate: {
                $lt: reservation.startDate
              }
            }
          ]
        }).count(cb);
    },
    (cb) => {
      mongoose.models.Reservation
        .find({}).count(cb);
    },
  ], (err, results) => {
    if (results[0] !== results[1]) {
      next(new Error('Overlapping reservation'));
    }
    next();
  });
});

module.exports = Event.discriminator('Reservation', reservationSchema);

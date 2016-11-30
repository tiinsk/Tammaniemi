const Reservation = require('../models/reservation');
const passport = require('./passport.js');

module.exports = (app) => {
  app.get('/api/Reservation', passport.authenticate('jwt', {
    session: false,
  }), (req, res) => {
    Reservation.find({})
      .populate({
        path: 'comments',
        populate: {
          path: 'userId'
        }
      })
      .populate('userId')
      .exec((err, reservations) => {
        if (err) {
          res.sendStatus(500);
          return;
        }
        if (reservations.length === 0) {
          res.status(404).send({
            message: 'No reservations found',
          });
          return;
        }
        res.json(reservations);
      });
  });

  /*
   * GET reservation information
   */
  app.get('/api/Reservation/:reservationId', passport.authenticate('jwt', {
    session: false,
  }), (req, res) => {
    Reservation.findById(req.params.reservationId,
      '_id title startDate endDate comments userId createdAt')
      .populate({
        path: 'comments',
        populate: {
          path: 'userId'
        }
      })
      .populate('userId')
      .exec((err, reservation) => {
        if (err) {
          res.status(500).send({
            message: 'Reservation not found',
          });
          return;
        }
        if (reservation === null) {
          res.status(404).send({
            message: 'Reservation not found',
          });
          return;
        }
        res.json(reservation);
      });
  });

  /*
   * POST add new reservation
   */
  app.post('/api/Reservation', passport.authenticate('jwt', {
    session: false,
  }), (req, res) => {
    const addReservation = req.body;
    addReservation.userId = req.user._id;

    if (addReservation.title === undefined ||
      addReservation.startDate === undefined ||
      addReservation.endDate === undefined) {
      res.status(400).send({
        message: 'Invalid reservation data',
      });
      return;
    }

    const newReservation = new Reservation(addReservation);

    newReservation.save((err, reservation) => {
      if (err) {
        res.status(500).send({
          message: 'Creation failed',
        });
        return;
      }

      res.status(201).json(reservation);
    });
  });

  /*
   * PUT update task
   */
  app.put('/api/Reservation/:taskId', passport.authenticate('jwt', {
    session: false,
  }), (req, res) => {
    const updatedReservation = req.body;

    if (updatedReservation.title === undefined || updatedReservation.startDate === undefined
      || updatedReservation.endDate === undefined) {
      res.status(400).send({
        message: 'Invalid reservation data',
      });
      return;
    }

    Reservation.findById(req.params.taskId, (err, task) => {
      if (err) {
        res.sendStatus(500);
        return;
      }

      if (!task) {
        res.status(404).send({
          message: 'Reservation not found',
        });
        return;
      }

      if (!req.user._id.equals(task.userId)) {
        res.status(403).send({
          message: 'Unauthorized',
        });
        return;
      }

      task.update(updatedReservation, (err2) => {
        if (err2) {
          res.sendStatus(500);
          return;
        }
        res.sendStatus(200);
      });
    });
  });

  /*
   * DELETE task
   */
  app.delete('/api/Reservation/:reservationId', passport.authenticate('jwt', {
    session: false,
  }), (req, res) => {
    Reservation.findById(req.params.reservationId, (err, reservation) => {
      if (err) {
        res.sendStatus(500);
        return;
      }

      if (!reservation) {
        res.status(404).send({
          message: 'Reservation not found',
        });
        return;
      }

      if (!req.user._id.equals(reservation.userId)) {
        res.status(403).send({
          message: 'Unauthorized',
        });
        return;
      }

      reservation.remove((err2) => {
        if (err2) {
          res.sendStatus(500);
          return;
        }
        res.sendStatus(200);
      });
    });
  });
};

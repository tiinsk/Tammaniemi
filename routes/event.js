const Event = require('../models/event');
const passport = require('./passport.js');

module.exports = (app) => {
  /*
   * GET all events
   */
  app.get('/api/events', passport.authenticate('jwt', {
    session: false
  }), (req, res) => {
    Event.find({})
    .populate('comments')
    .populate('userId')
    .exec((err, events) => {
      if (err) {
        res.sendStatus(500);
        return;
      }
      if (events.length === 0) {
        res.status(404).send({
          message: 'No events found'
        });
        return;
      }
      res.json(events);
    });
  });
};

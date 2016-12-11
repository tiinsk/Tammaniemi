const Event = require('../models/event');
const User = require('../models/user');
const passport = require('./passport.js');

module.exports = (app) => {
  /*
   * GET all events
   */
  app.get('/api/events', passport.authenticate('jwt', {
    session: false
  }), (req, res, next) => {
    const eventPromise = Event.find({})
      .populate({
        path: 'comments',
        populate: {
          path: 'userId'
        }
      })
      .populate('userId')
      .exec();
    const userPromise = User.find({})
      .exec();

    Promise.all([eventPromise, userPromise])
      .then((result) => {
        if (!result.length) {
          throw new Error('No events found');
        }

        res.json([].concat(...result));
      })
      .then(null, next);
  });
};

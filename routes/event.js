const Event = require('../models/event');
const User = require('../models/user');
const Photoset = require('../models/photoset');
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

    const photosetPromise = Photoset.find({})
      .populate('photos')
      .populate('userId')
      .exec();

    Promise.all([eventPromise, userPromise, photosetPromise])
      .then((result) => {
        if (!result.length) {
          throw new Error('No events found');
        }

        res.json([].concat(...result));
      })
      .then(null, next);
  });
};

const passport = require('./passport.js');
const flickrOptions = require('../config.js').flickrOptions;
const Photoset = require('../models/photoset.js');

module.exports = (app, flickr) => {
  app.get('/api/Photoset/', passport.authenticate('jwt', {session: false}),
    (req, res, next) => {
      Photoset.find({})
        .populate('userId')
        .exec()
        .then((photosets) => {
          if (photosets === null) {
            throw new Error('No photosets found');
          }
          res.json(photosets);
        })
        .then(null, next);
    });

  app.get('/api/Photoset/:photosetId', passport.authenticate('jwt', {session: false}),
    (req, res) => {
      flickr.photosets.getPhotos({
        authenticated: true,
        photoset_id: req.params.photosetId,
        user_id: flickrOptions.user_id,
        extras: 'url_c'
      }, (error, result) => {
        if (error) {
          res.status(500);
          res.json(error);
          return;
        }
        res.json(result.photoset);
      });
    });
};

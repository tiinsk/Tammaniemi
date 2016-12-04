const passport = require('./passport.js');
const flickrOptions = require('../config.js').flickrOptions;

module.exports = (app, flickr) => {
  app.get('/api/Photoset/', passport.authenticate('jwt', { session: false }),
  (req, res) => {
    flickr.photosets.getList({
      authenticated: true
    }, (error, result) => {
      if (error) {
        res.status(500);
        res.json(error);
        return;
      }
      res.json(result.photosets.photoset);
    });
  });

  app.get('/api/Photoset/:photosetId', passport.authenticate('jwt', { session: false }),
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

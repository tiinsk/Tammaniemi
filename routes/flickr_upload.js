const _ = require('lodash');
const request = require('request');
const async = require('async');
const crypto = require('crypto');

const passport = require('./passport.js');
const Photo = require('../models/photo.js');
const Photoset = require('../models/photoset.js');

function createQueryString(params) {
  return _.chain(params)
    .map((value, key) => `${key}=${value}`)
    .sort()
    .join('&')
    .value();
}

function calcFlickrSignature(data, key, secret) {
  const hmacKey = `${key}&${secret}`;
  const hmac = crypto.createHmac('SHA1', hmacKey);

  hmac.update(data);
  const digest = hmac.digest('base64');
  return encodeURIComponent(digest);
}

function constructPhotoUpload(photo, flickrOptions) {
  const url = 'https://up.flickr.com/services/upload/';
  const params = {
    title: photo.name,
    oauth_signature_method: 'HMAC-SHA1',
    oauth_consumer_key: flickrOptions.oauth_consumer_key,
    oauth_token: flickrOptions.oauth_token,
    oauth_nonce: flickrOptions.oauth_nonce,
    oauth_timestamp: flickrOptions.oauth_timestamp,
  };
  const queryStr = createQueryString(params);
  const baseStr = ['POST', encodeURIComponent(url), encodeURIComponent(queryStr)].join('&');

  params.oauth_signature = calcFlickrSignature(baseStr, flickrOptions.secret, flickrOptions.access_token_secret);
  params.photo = {
    value: photo.data,
    options: {
      filename: photo.name,
      contentType: photo.mimetype
    }
  };
  const signature = `&oauth_signature=${params.oauth_signature}`;
  const flickrURL = `${url}?${queryStr}${signature}`;

  return {
    flickrURL,
    params
  };
}

module.exports = (app, flickr) => {
  const flickrOptions = {
    secret: flickr.options.secret,
    access_token_secret: flickr.options.access_token_secret,
    oauth_consumer_key: flickr.options.api_key,
    oauth_token: flickr.options.access_token,
    oauth_nonce: flickr.options.oauth_nonce,
    oauth_timestamp: flickr.options.oauth_timestamp
  };

  app.post('/api/flickr', passport.authenticate('jwt', {session: false}), (req, res) => {
    // console.log('photos', photos);
    async.map(req.files, (photo, cb) => {
      const {flickrURL, params} = constructPhotoUpload(photo, flickrOptions);

      request.post({url: flickrURL, formData: params}, (error, response, body) => {
        if (error) {
          res.setStatus(500);
          res.json(error);
        }
        const flickrId = parseInt(body.split('<photoid>')[1].split('</photoid>')[0], 10);

        const newPhoto = new Photo({
          userId: req.user._id,
          flickrId
        });

        newPhoto.save((err, photo) => {
          cb(error, {
            flickrId,
            localId: photo._id
          });
        })
      });
    }, (err, result) => {
      const photos = _.values(result);

      flickr.photosets.create({
        authenticated: true,
        title: req.body.title,
        primary_photo_id: photos[0].flickrId,
      }, (err, result) => {
        const photosetId = result.photoset.id;
        async.each(photos.splice(1), (photo, addCb) => {
          flickr.photosets.addPhoto({
            authenticated: true,
            photoset_id: photosetId,
            photo_id: photo.flickrId
          }, (err, result) => {
            addCb(err, result);
          });
        }, (err) => {
          if (err) {
            res.setStatus(500);
            res.json(err);
          }

          const newPhotoset = new Photoset({
            title: req.body.title,
            userId: req.user._id,
            flickrId: photosetId,
            photos: photos.map((photo) => photo.localId)
          });
          newPhotoset.save((err, photoset) => {
            if (err) {
              res.setStatus(500);
              res.json(err);
            }
            res.json({
              id: photosetId
            });
          });
        });
      });
    });
  });
};

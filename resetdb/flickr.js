const Flickr = require('flickrapi');
const flickrOptions = require('../config.js').flickrOptions;
const async = require('async');
const users = require('./users.json');
const constructPhotoUrl = require('../utility/flickr').constructPhotoUrl;
const Photoset = require('../models/photoset.js');
const Photo = require('../models/photo.js');


const createPhotosetsFromFlickr = (done) => {
  const photosetData = [];

  Flickr.authenticate(flickrOptions, (error, flickr) => {
    flickr.photosets.getList({
      authenticated: true
    }, (error, result) => {
      if (error) {
        console.log(err);
        return done(err);
      }

      const photosets = result.photosets.photoset;
      if (!photosets.length) {
        return done();
      }

      async.each(photosets, (photoset, cb) => {
        const {farm, server, primary, secret} = photoset;

        const newPhotosetModel = {
          title: photoset.title._content,
          userId: users[0]._id,
          flickrId: photoset.id,
          primaryPhotoUrl: constructPhotoUrl({farm, server, id: primary, secret}),
          createdAt: new Date(parseInt(photoset.date_create) * 1000),
          photos: []
        };

        flickr.photosets.getPhotos({
          authenticated: true,
          user_id: flickrOptions.user_id,
          photoset_id: photoset.id
        }, (error, photoset) => {
          if (error) {
            console.log(err);
            return done(err);
          }

          const photoDocs = photoset.photoset.photo.map((photo) => ({
            userId: users[0]._id,
            flickrId: photo.id
          }));

          Photo.create(photoDocs)
            .then((photos) => {
              newPhotosetModel.photos = photos;

              photosetData.push(newPhotosetModel);
              cb();
            })
            .catch((err) => {
              cb(err);
            });
        })
      }, (err) => {
        if (err) {
          console.log(err);
          return done(err);
        }
        Photoset.create(photosetData, (err, photosets) => {
          if (err) {
            console.log(err);
            return done(err);
          }

          console.log(`Created ${photosets.length} photosets from flickr`);
          done();
        });
      })
    });
  });
};

module.exports = createPhotosetsFromFlickr;

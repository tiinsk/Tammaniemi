const flickrOptions = require('./flickr.config.js');
module.exports = {
  database: {
    production: 'localhost/tammaniemi', //Change!!!!!
    development: 'localhost/tammaniemi',
    test: 'localhost/test',
  },
  jwt: {
    production: {
      secret: 'tammaniemi', //Change!!!!
      ignoreExpiration: false
    },
    development: {
      secret: 'tammaniemi',
      ignoreExpiration: false
    },
    test: {
      secret: 'testi_secret',
      ignoreExpiration: true
    },
  },
  flickrOptions
};

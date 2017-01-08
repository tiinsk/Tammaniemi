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
      inviteSecret: 'invite_to_tammaniemi', //Change!!!!
      ignoreExpiration: false
    },
    development: {
      secret: 'tammaniemi',
      inviteSecret: 'invite_to_tammaniemi',
      ignoreExpiration: false
    },
    test: {
      secret: 'testi_secret',
      ignoreExpiration: true,
      inviteSecret: 'invite_to_tammaniemi',
    },
  },
  flickrOptions
};

module.exports = {
  database: {
    development: 'localhost/tammaniemi',
    test: 'localhost/test',
  },
  jwt: {
    development: {
      secret: 'tammaniemi',
      ignoreExpiration: false
    },
    test: {
      secret: 'testi_secret',
      ignoreExpiration: true
    },
  }
};


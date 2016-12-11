process.env.NODE_ENV = 'test';

const chai = require('chai');
const async = require('async');
const should = chai.should();

const authToken = require('../utility/authtoken');
const AuthToken = require('../models/authtoken');
const User = require('../models/user');

import { user1, token1, expiredToken, usedToken } from './data.js';


describe('AuthToken db', () => {
  it('should clear test db', (done) => {
    async.each([
      AuthToken,
      User
    ], (collection, next) => {
      collection.remove({}, next);
    }, done);
  });
});

describe('AuthToken', () => {
  before((done) => {
    User.create([user1], done);
  });

  beforeEach((done) => {
    AuthToken.create([token1, expiredToken, usedToken], done);
  });

  afterEach((done) => {
    AuthToken.collection.drop();
    done();
  });

  it('should generate new authtoken', (done) => {
    authToken.createToken()
    .then((token) => {
      token.should.have.property('_id');
      token.should.have.property('token');
      token.should.have.property('validUntil');
      token.should.have.property('active');

      token.active.should.be.true;

      const hours = token.validUntil.getHours();
      const now = (new Date());
      now.setHours(now.getHours() + 4);
      hours.should.equal(now.getHours());
      done();
    }).catch((err) => {
      done(err);
    });
  });

  it('should validate authtoken', (done) => {
    authToken.validateToken(token1.token)
    .then(() => {
      done();
    }).catch((err) => {
      done(err);
    });
  });

  it('should invalidate invalid authtoken', (done) => {
    authToken.validateToken('2345werwer1242q3asd')
    .then(() => {
      done(new Error('Should invalidate'));
    }).catch(() => {
      done();
    });
  });

  it('should invalidate expired authtoken', (done) => {
    authToken.validateToken(expiredToken.token)
    .then(() => {
      done(new Error('Should invalidate'));
    }).catch(() => {
      done();
    });
  });

  it('should invalidate used authtoken', (done) => {
    authToken.validateToken(usedToken.token)
    .then(() => {
      done(new Error('Should invalidate'));
    }).catch(() => {
      done();
    });
  });
});


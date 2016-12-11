process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');
const async = require('async');
const should = chai.should();

const app = require('../../server');
const User = require('../../models/user');
const AuthToken = require('../../models/authtoken');
const authToken = require('../../utility/authToken');

const utility = require('../utility');

import { user1, user2, admin, deletedUser, token1, expiredToken, usedToken } from '../data.js';

chai.use(chaiHttp);

describe('User db', () => {
  it('should clear test db', (done) => {
    async.each([
      User,
    ], (collection, next) => {
      collection.remove({}, next);
    }, done);
  });
});

describe('Auth User', () => {
  afterEach((done) => {
    async.each([
      User,
    ], (collection, next) => {
      collection.remove({}, next);
    }, done);
  });

  beforeEach((done) => {
    User.create([user1, deletedUser], done);
  });

  it('user should login', (done) => {

    chai.request(app)
      .post('/api/login')
      .send({
        email: 'teppo@testaaja',
        password: 'testi1'
      })
      .then((res) => {
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.have.property('_id');
        res.body.should.have.property('name');
        res.body.should.have.property('email');
        res.body.should.not.have.property('password');
        res.body.name.should.equal('Teppo Testaaja');
        res.body.email.should.equal('teppo@testaaja');
        done();
      }).catch((err) => {
        done(err);
      });
  });

  it('deletd user should not login', (done) => {

    chai.request(app)
      .post('/api/login')
      .send({
        email: 'terttu@deleted',
        password: 'testi2'
      })
      .then((res) => {
        done(new Error('Should fail'));
      }).catch((err) => {
        err.should.have.status(401);
        done();
      });
  });
});


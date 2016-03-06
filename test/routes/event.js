process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');
const async = require('async');
const should = chai.should();

const app = require('../../server');
const Event = require('../../models/event');
const User = require('../../models/user');
const Post = require('../../models/post');
const Reservation = require('../../models/reservation');
const utility = require('../utility');

import { user1, post1, post2, reservation1 } from '../data.js';

chai.use(chaiHttp);

describe('Post db', () => {
  it('should clear test db', (done) => {
    async.each([
      Event,
      User,
    ], (collection, next) => {
      collection.remove({}, next);
    }, done);
  });
});

describe('Post', () => {
  before((done) => {
    User.create([user1], done);
  });

  beforeEach((done) => {
    async.series([
      (cb) => {
        Post.create([post1, post2], cb);
      },
      (cb) => {
        Reservation.create(reservation1, cb);
      }
    ], done);
  });

  afterEach((done) => {
    Event.collection.drop();
    done();
  });

  it('should return three Events', (done) => {
    chai.request(app)
    .get('/api/events')
    .set('Cookie', `JWT=${utility.getUserCookie(user1)}`)
    .then((res) => {
      res.should.have.status(200);
      res.should.be.json;
      res.body.should.be.a('array');
      res.body.should.have.a.lengthOf(3);
      res.body.forEach((event) => {
        event.should.have.property('_id');
        event.should.have.property('title');
        event.should.have.property('userId');
        event.should.have.property('comments');
      });
      done();
    }).catch((err) => {
      done(err);
    });
  });
});


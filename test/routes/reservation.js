process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');
const async = require('async');
const should = chai.should();
const expect = chai.expect;

const app = require('../../server');
const Reservation = require('../../models/reservation');
const User = require('../../models/user');
const utility = require('../utility');

import { user1, user2, reservation1, reservation2 } from '../data.js';

chai.use(chaiHttp);

describe('Reservation db', () => {
  afterEach(() => {
    Reservation.collection.drop();
  });

  it('should clear test db', (done) => {
    async.each([
      Reservation,
      User,
    ], (collection, next) => {
      collection.remove({}, next);
    }, done);
  });

  it('should be possible to create reservation', (done) => {
    Reservation.create(reservation1, done);
  });

  it('should not be possible to create reservation on same dates', (done) => {
    async.eachSeries([
      reservation1,
      reservation1
    ], (reservation, cb) => {
      Reservation.create(reservation, cb);
    }, (err) => {
      expect(err).to.not.be.null;
      expect(err.message).to.be.equal('Overlapping reservation');
      Reservation.find({}).count((err, count) => {
        expect(count).to.be.equal(1);
        done();
      });
    });
  });

  function testOverlappingReservations(reservations, success, done) {
    async.eachSeries(reservations, (reservation, cb) => {
      Reservation.create(reservation, cb);
    }, (err) => {
      expect(err).to.not.be.null;
      expect(err.message).to.be.equal('Overlapping reservation');
      Reservation.find({}).count((err, count) => {
        expect(count).to.be.equal(success);
        done();
      });
    });
  }

  it('should not be possible to create overlapping others in start', (done) => {
    const overlapping = {
      title: 'Mökkivaraus',
      userId: user1._id,
      startDate: new Date(2016, 6, 3),
      endDate: new Date(2016, 6, 10),
    };
    testOverlappingReservations([reservation1, overlapping], 1, done);
  });

  it('should not be possible to create reservation over others', (done) => {
    const overlapping = {
      title: 'Mökkivaraus',
      userId: user1._id,
      startDate: new Date(2016, 6, 1),
      endDate: new Date(2016, 7, 20),
    };

    testOverlappingReservations([reservation1, reservation2, overlapping], 2, done);
  });

  it('should not be possible to create reservation overlapping others in middle', (done) => {
    const overlapping = {
      title: 'Mökkivaraus',
      userId: user1._id,
      startDate: new Date(2016, 6, 7),
      endDate: new Date(2016, 7, 7),
    };

    testOverlappingReservations([reservation1, reservation2, overlapping], 2, done);
  });

  it('should not be possible to create reservation overlapping others in end', (done) => {
    const overlapping = {
      title: 'Mökkivaraus',
      userId: user1._id,
      startDate: new Date(2016, 7, 7),
      endDate: new Date(2016, 8, 7),
    };

    testOverlappingReservations([reservation1, reservation2, overlapping], 2, done);
  });
});

describe('Reservation', () => {
  before((done) => {
    User.create([user1, user2], done);
  });

  beforeEach((done) => {
    Reservation.create([reservation1, reservation2], done);
  });

  afterEach((done) => {
    Reservation.collection.drop();
    done();
  });

  it('All should return two reservation', (done) => {
    chai.request(app)
    .get('/api/Reservation')
    .set('Cookie', `JWT=${utility.getUserCookie(user1)}`)
    .then((res) => {
      res.should.have.status(200);
      res.should.be.json;
      res.body.should.be.a('array');
      res.body.should.have.a.lengthOf(2);
      res.body[0].should.have.property('_id');
      res.body[0].should.have.property('title');
      res.body[0].should.have.property('userId');
      res.body[0].should.have.property('startDate');
      res.body[0].should.have.property('endDate');
      done();
    }).catch((err) => {
      done(err);
    });
  });

  it('should return one reservation', (done) => {
    chai.request(app)
    .get(`/api/Reservation/${reservation1._id}`)
    .set('Cookie', `JWT=${utility.getUserCookie(user1)}`)
    .then((res) => {
      res.should.have.status(200);
      res.should.be.json;
      res.body.should.be.an('object');
      res.body._id.should.equal(reservation1._id);
      res.body.title.should.equal(reservation1.title);
      res.body.userId._id.should.equal(reservation1.userId);
      res.body.startDate.should.equal(reservation1.startDate.toISOString());
      res.body.endDate.should.equal(reservation1.endDate.toISOString());
      done();
    }).catch((err) => {
      done(err);
    });
  });
});


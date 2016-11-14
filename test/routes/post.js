process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');
const async = require('async');
const should = chai.should();

const app = require('../../server');
const Post = require('../../models/post');
const User = require('../../models/user');
const utility = require('../utility');

import { user1, user2, post1, post2 } from '../data.js';

chai.use(chaiHttp);

describe('Post db', () => {
  it('should clear test db', (done) => {
    async.each([
      Post,
      User,
    ], (collection, next) => {
      collection.remove({}, next);
    }, done);
  });
});

describe('Post', () => {
  before((done) => {
    User.create([user1, user2], done);
  });

  beforeEach((done) => {
    Post.create([post1, post2], done);
  });

  afterEach((done) => {
    Post.collection.drop();
    done();
  });

  it('should return two post', (done) => {
    chai.request(app)
    .get('/api/Post')
    .set('Cookie', `JWT=${utility.getUserCookie(user1)}`)
    .then((res) => {
      res.should.have.status(200);
      res.should.be.json;
      res.body.should.be.a('array');
      res.body.should.have.a.lengthOf(2);
      res.body[0].should.have.property('_id');
      res.body[0].should.have.property('title');
      res.body[0].should.have.property('userId');
      res.body[0].should.have.property('content');
      done();
    }).catch((err) => {
      done(err);
    });
  });
});


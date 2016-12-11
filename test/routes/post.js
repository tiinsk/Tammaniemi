process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');
const async = require('async');
const should = chai.should();

const app = require('../../server');
const Post = require('../../models/post');
const User = require('../../models/user');
const utility = require('../utility');

import {user1, user2, admin, post1, post2} from '../data.js';

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
    User.create([user1, user2, admin], done);
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

  it('user should be able to update own post', (done) => {
    const updatePost = {title: 'Updated post', content: 'Wow such cool stuff'};
    chai.request(app)
      .put(`/api/Post/${post1._id}`)
      .set('Cookie', `JWT=${utility.getUserCookie(user1)}`)
      .send(Object.assign({}, post1, updatePost))
      .then((res) => {
        res.should.have.status(200);

        Post.findById(post1._id, (err, post) => {
          post.title.should.equal(updatePost.title);
          post.content.should.equal(updatePost.content);
          done();
        });
      })
      .catch((err) => {
        done(err);
      });
  });

  it('admin should be able to update other posts', (done) => {
    const updatePost = {title: 'Updated post', content: 'Wow such cool stuff'};
    chai.request(app)
      .put(`/api/Post/${post1._id}`)
      .set('Cookie', `JWT=${utility.getUserCookie(admin)}`)
      .send(Object.assign({}, post1, updatePost))
      .then((res) => {
        res.should.have.status(200);

        Post.findById(post1._id, (err, post) => {
          post.title.should.equal(updatePost.title);
          post.content.should.equal(updatePost.content);
          done();
        });
      })
      .catch((err) => {
        done(err);
      });
  });

  it('user should not be able to update others post', (done) => {
    chai.request(app)
      .put(`/api/Post/${post2._id}`)
      .set('Cookie', `JWT=${utility.getUserCookie(user1)}`)
      .send(Object.assign({}, post2, {title: 'Updated task'}))
      .then((res) => {
        done(new Error('Should fail'));
      })
      .catch((err) => {
        err.should.have.status(403);
        done();
      });
  });

  it('user should be able to delete own post', (done) => {
    chai.request(app)
      .delete(`/api/Post/${post1._id}`)
      .set('Cookie', `JWT=${utility.getUserCookie(user1)}`)
      .then((res) => {
        res.should.have.status(200);

        Post.findById(post1._id, (err, post) => {
          should.equal(post, null);
          done();
        });
      })
      .catch((err) => {
        done(err);
      });
  });

  it('admin should be able to delete other post', (done) => {
    chai.request(app)
      .delete(`/api/Post/${post1._id}`)
      .set('Cookie', `JWT=${utility.getUserCookie(admin)}`)
      .then((res) => {
        res.should.have.status(200);

        Post.findById(post1._id, (err, post) => {
          should.equal(post, null);
          done();
        });
      })
      .catch((err) => {
        done(err);
      });
  });

  it('user should not be able to delete others post', (done) => {
    chai.request(app)
      .delete(`/api/Post/${post2._id}`)
      .set('Cookie', `JWT=${utility.getUserCookie(user1)}`)
      .then((res) => {
        done(new Error('Should fail'));
      })
      .catch((err) => {
        err.should.have.status(403);
        done();
      });
  });

});


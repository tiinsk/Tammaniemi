process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');
const async = require('async');
const should = chai.should();

const app = require('../../server');
const Task = require('../../models/task');
const User = require('../../models/user');
const utility = require('../utility');

import { user1, user2, admin, task1, task2 } from '../data.js';

chai.use(chaiHttp);

describe('Task db', () => {
  it('should clear test db', (done) => {
    async.each([
      Task,
      User,
    ], (collection, next) => {
      collection.remove({}, next);
    }, done);
  });
});

describe('Task', () => {
  before((done) => {
    User.create([user1, user2, admin], done);
  });

  beforeEach((done) => {
    Task.create([task1, task2], done);
  });

  afterEach((done) => {
    Task.collection.drop();
    done();
  });

  it('should return one task', (done) => {
    chai.request(app)
    .get('/api/tasks')
    .set('Cookie', `JWT=${utility.getUserCookie(user1)}`)
    .then((res) => {
      res.should.have.status(200);
      res.should.be.json;
      res.body.should.be.a('array');
      res.body.should.have.a.lengthOf(2);
      res.body[0].should.have.property('_id');
      res.body[0].should.have.property('title');
      res.body[0].should.have.property('userId');
      res.body[0].should.have.property('category');
      done();
    }).catch((err) => {
      done(err);
    });
  });

  it('user should be able to update own task', (done) => {
    chai.request(app)
    .put(`/api/tasks/${task1._id}`)
    .set('Cookie', `JWT=${utility.getUserCookie(user1)}`)
    .send(Object.assign({}, task1, {title: 'Updated task', category: 4}))
    .then((res) => {
      res.should.have.status(200);

      Task.findById(task1._id, (err, task) => {
        task.title.should.equal('Updated task');
        task.category.should.equal(4);
        done();
      });
    }).catch((err) => {
      done(err);
    });
  });

  it('user should not be able to update others task', (done) => {
    chai.request(app)
    .put(`/api/tasks/${task2._id}`)
    .set('Cookie', `JWT=${utility.getUserCookie(user1)}`)
    .send(Object.assign({}, task2, {title: 'Updated task', category: 4}))
    .then((res) => {
      res.should.have.status(200);

      Task.findById(task2._id, (err, task) => {
        task.title.should.equal('New Task');
        task.isDone.should.be.false;
        task.category.should.equal(1);
        done();
      });
    }).catch((err) => {
      done(err);
    });
  });

  it('user should be able to check done others task', (done) => {
    chai.request(app)
    .put(`/api/tasks/${task2._id}`)
    .set('Cookie', `JWT=${utility.getUserCookie(user1)}`)
    .send(Object.assign({}, task2, {isDone: true, doneByUser: user1._id}, {title: 'Updated task', category: 4}))
    .then((res) => {
      res.should.have.status(200);

      Task.findById(task2._id, (err, task) => {
        task.isDone.should.be.true;
        task.doneByUser.toString().should.equal(user1._id);
        task.title.should.equal('New Task');
        task.category.should.equal(1);
        done();
      });
    }).catch((err) => {
      done(err);
    });
  });

  it('user should be able to delete own task', (done) => {
      chai.request(app)
        .delete(`/api/tasks/${task1._id}`)
        .set('Cookie', `JWT=${utility.getUserCookie(user1)}`)
        .then((res) => {
          res.should.have.status(200);

          Task.findById(task1._id, (err, task) => {
            should.equal(task, null);
            done();
          });
        })
        .catch((err) => {
          done(err);
        });
    });

    it('admin should be able to delete other task', (done) => {
      chai.request(app)
        .delete(`/api/tasks/${task1._id}`)
        .set('Cookie', `JWT=${utility.getUserCookie(admin)}`)
        .then((res) => {
          res.should.have.status(200);

          Task.findById(task1._id, (err, task) => {
            should.equal(task, null);
            done();
          });
        })
        .catch((err) => {
          done(err);
        });
    });

    it('user should not be able to delete others task', (done) => {
      chai.request(app)
        .delete(`/api/tasks/${task2._id}`)
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


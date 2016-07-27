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

import { user1, user2, token1, expiredToken, usedToken } from '../data.js';

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

describe('Create User', () => {
  beforeEach((done) => {
    AuthToken.create([token1, expiredToken, usedToken], done);
  });

  afterEach((done) => {
    async.each([
      User,
      AuthToken
    ], (collection, next) => {
      collection.remove({}, next);
    }, done);
  });

  it('should create user', (done) => {
    const newUser = {
      name: 'Terttu Testaaja',
      email: 'terttu@testaaja',
      password: 'testi2',
    };

    chai.request(app)
    .post('/api/users')
    .send({
      user: newUser,
      token: token1.token
    })
    .then((res) => {
      res.should.have.status(200);
      res.should.be.json;
      res.body.should.have.property('_id');
      res.body.should.have.property('name');
      res.body.should.have.property('email');
      res.body.should.not.have.property('password');
      res.body.name.should.equal(newUser.name);
      res.body.email.should.equal(newUser.email);
      done();
    }).catch((err) => {
      done(err);
    });
  });

  it('should create user with new token', (done) => {
    const newUser = {
      name: 'Terttu Testaaja',
      email: 'terttu@testaaja',
      password: 'testi2',
    };

    authToken.createToken()
    .then(({ token }) => {
      chai.request(app)
      .post('/api/users')
      .send({
        user: newUser,
        token
      })
      .then((res) => {
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.have.property('_id');
        res.body.should.have.property('name');
        res.body.should.have.property('email');
        res.body.should.not.have.property('password');
        res.body.name.should.equal(newUser.name);
        res.body.email.should.equal(newUser.email);
        done();
      }).catch((err) => {
        done(err);
      });
    });
  });

  it('should not create two users with same token', (done) => {
    const newUser = {
      name: 'Terttu Testaaja',
      email: 'terttu@testaaja',
      password: 'testi2',
    };

    const newUser2 = {
      name: 'Terttu2 Testaaja2',
      email: 'terttu2@testaaja2',
      password: 'testi2',
    };

    let token;

    authToken.createToken()
    .then(({ token: newToken }) => {
      token = newToken;

      return chai.request(app)
      .post('/api/users')
      .send({
        user: newUser,
        token
      })
      .then((res) => {
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.have.property('_id');
        res.body.should.have.property('name');
        res.body.should.have.property('email');
        res.body.should.not.have.property('password');
        res.body.name.should.equal(newUser.name);
        res.body.email.should.equal(newUser.email);
      });
    })
    .then(() =>
      chai.request(app)
      .post('/api/users')
      .send({
        user: newUser2,
        token
      })
      .then(() => {
        throw new Error('Should fail');
      }, (err) => {
        err.should.have.status(500);
        return Promise.resolve();
      })
    )
    .then(() => {
      done();
    })
    .then(null, done);
  });

  it('should not create user without authtoken', (done) => {
    const newUser = {
      name: 'Terttu Testaaja',
      email: 'terttu@testaaja',
      password: 'testi2',
    };

    chai.request(app)
    .post('/api/users')
    .send({
      user: newUser
    })
    .then((res) => {
      done(new Error('Should fail'));
    }).catch((err) => {
      err.should.have.status(500);
      done();
    });
  });

  it('should not create user with expired authtoken', (done) => {
    const newUser = {
      name: 'Terttu Testaaja',
      email: 'terttu@testaaja',
      password: 'testi2',
    };

    chai.request(app)
    .post('/api/users')
    .send({
      user: newUser,
      token: expiredToken
    })
    .then((res) => {
      done(new Error('Should fail'));
    }).catch((err) => {
      err.should.have.status(500);
      done();
    });
  });

  it('should not create user with used authtoken', (done) => {
    const newUser = {
      name: 'Terttu Testaaja',
      email: 'terttu@testaaja',
      password: 'testi2',
    };

    chai.request(app)
    .post('/api/users')
    .send({
      user: newUser,
      token: usedToken
    })
    .then((res) => {
      done(new Error('Should fail'));
    }).catch((err) => {
      err.should.have.status(500);
      done();
    });
  });
});


describe('Update User', () => {
  afterEach((done) => {
    async.each([
      User,
    ], (collection, next) => {
      collection.remove({}, next);
    }, done);
  });

  beforeEach((done) => {
    User.create([user1, user2], done);
  });

  it('user should update self', (done) => {
    const newUser = {
      name: 'Matti Testaaja',
    };

    chai.request(app)
    .put(`/api/users/${user1._id}`)
    .send(newUser)
    .set('Cookie', `JWT=${utility.getUserCookie(user1)}`)
    .then((res) => {
      res.should.have.status(200);
      res.should.be.json;
      res.body.should.have.property('_id');
      res.body.should.have.property('name');
      res.body.should.have.property('email');
      res.body.should.not.have.property('password');
      res.body.name.should.equal(newUser.name);
      done();
    }).catch((err) => {
      done(err);
    });
  });

  it('user should not update own email', (done) => {
    const newUser = {
      name: 'Teppo Testaaja',
      email: 'masa@massa'
    };

    chai.request(app)
    .put(`/api/users/${user1._id}`)
    .send(newUser)
    .set('Cookie', `JWT=${utility.getUserCookie(user1)}`)
    .then((res) => {
      res.should.have.status(200);
      res.should.be.json;
      res.body.should.have.property('_id');
      res.body.should.have.property('name');
      res.body.should.have.property('email');
      res.body.should.not.have.property('password');
      res.body.name.should.equal(user1.name);
      res.body.email.should.equal(user1.email);
      done();
    }).catch((err) => {
      done(err);
    });
  });

  it('should not update other users', (done) => {
    const newUser = {
      name: 'Matti Testaaja',
      email: 'masa@massa',
    };

    chai.request(app)
    .put(`/api/users/${user2._id}`)
    .send(newUser)
    .set('Cookie', `JWT=${utility.getUserCookie(user1)}`)
    .then((res) => {
      done();
    }).catch((err) => {
      err.should.have.status(500);
      done();
    });
  });
});

describe('Delete User', () => {
  afterEach((done) => {
    async.each([
      User,
    ], (collection, next) => {
      collection.remove({}, next);
    }, done);
  });

  beforeEach((done) => {
    User.create([user1, user2], done);
  });

  it('user should delete self', (done) => {
    chai.request(app)
    .delete(`/api/users/${user1._id}`)
    .set('Cookie', `JWT=${utility.getUserCookie(user1)}`)
    .then((res) => {
      res.should.have.status(201);
      done();
    }).catch((err) => {
      done(err);
    });
  });

  it('user should not delete others', (done) => {
    chai.request(app)
    .delete(`/api/users/${user1._id}`)
    .set('Cookie', `JWT=${utility.getUserCookie(user2)}`)
    .then((res) => {
      done(new Error('Should fail'));
    }).catch((err) => {
      err.should.have.status(500);
      done();
    });
  });
});


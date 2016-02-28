process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
const mongoose = require('mongoose');

const app = require('../server');

chai.use(chaiHttp);

describe('SmokeTests', () => {
  it('should have connection to db', () => {
    expect(mongoose.connection.readyState).to.equal(1);
  });

  it('should start express server and return html from index', (done) => {
    chai.request(app)
    .get('/')
    .then((res) => {
      res.should.have.status(200);
      res.should.be.html;
      done();
    });
  });
});


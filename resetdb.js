const data = {
  User: require('./resetdb/users.json'),
  Infopost: require('./resetdb/infoposts.json'),
  Post: require('./resetdb/posts.json'),
  Reservation: require('./resetdb/reservations.json'),
  Task: require('./resetdb/tasks.json'),
};

const collections = {
  User: require('./models/user.js'),
  Infopost: require('./models/infopost.js'),
  Post: require('./models/post.js'),
  Reservation: require('./models/reservation.js'),
  Task: require('./models/task.js')
};

const config = require('./config');
const mongoose = require('mongoose');
const async = require('async');

mongoose.connect(config.database[process.env.NODE_ENV]);
mongoose.connection.on('error', () => {
  console.info('Error: Could not connect to MongoDB. Did you forget to run `mongod`?');
});

const models = [
  'User',
  'Infopost',
  'Post',
  'Reservation',
  'Task'
];

function clearDB(createContentCb) {
  async.each(models, (key, next) => {
    collections[key].remove({}, next);
  }, createContentCb);
}

function createContent() {
  async.each(models, (key, next) => {
    collections[key].create(data[key], next);
  }, () => {
    mongoose.disconnect();
  });
}


clearDB(createContent);

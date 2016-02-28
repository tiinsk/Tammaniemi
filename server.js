const config = require('./config');

const express = require('express');
const path = require('path');
const logger = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const passport = require('./routes/passport.js');

const app = express();

mongoose.connect(config.database[app.settings.env]);
mongoose.connection.on('error', () => {
  console.info('Error: Could not connect to MongoDB. Did you forget to run `mongod`?');
});

app.set('port', process.env.PORT || 3000);
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(express.static(path.join(__dirname, 'public')));

// Routes
require('./routes/user')(app);
require('./routes/post')(app);
require('./routes/task')(app);
require('./routes/infopost')(app);
require('./routes/comment')(app);
require('./routes/reservation')(app);

// authentication
// app.post('/api/sessions', );

// POST /login
//   This is an alternative implementation that uses a custom callback to
//   achieve the same functionality.


app.post('/api/sessions', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.json(401, {
        error: info.message
      });
    }
    // user has authenticated correctly thus we create a JWT token
    const token = jwt.sign({
      name: user.name,
      id: user._id
    }, config.jwt_secret);
    return res.json({
      token
    });
  })(req, res, next);
});

app.get('/*', (req, res) => {
  res.sendFile('/views/index.html', {
    root: __dirname
  });
});

app.listen(app.get('port'), () => {
  console.log(`Express server listening on port ${app.get('port')}`);
});


module.exports = app;

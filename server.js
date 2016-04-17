const config = require('./config');
const webpackConfig = require('./webpack.config.js');
const webpackMiddleware = require('webpack-dev-middleware');
const webpack = require('webpack')(webpackConfig);
const express = require('express');
const path = require('path');
const logger = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const fileUpload = require('express-fileupload');

const Flickr = require('flickrapi');

const app = express();

mongoose.connect(config.database[app.settings.env]);
mongoose.connection.on('error', () => {
  console.info('Error: Could not connect to MongoDB. Did you forget to run `mongod`?');
});

app.set('port', process.env.PORT || 3000);
app.use(logger('dev'));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

// default options, no immediate parsing
app.use(fileUpload());
app.use(express.static(path.join(__dirname, 'public')));

app.use(webpackMiddleware(webpack, {
  publicPath: '/js/'
}));
app.use(express.static(path.join(__dirname, 'public')));
// Routes
require('./routes/auth')(app);
require('./routes/user')(app);
require('./routes/post')(app);
require('./routes/task')(app);
require('./routes/infopost')(app);
require('./routes/comment')(app);
require('./routes/reservation')(app);
require('./routes/event')(app);

Flickr.authenticate(config.flickrOptions, (error, flickr) => {
  require('./routes/flickr')(app, flickr);
  require('./routes/flickr_upload')(app, flickr);

  app.get('/*', (req, res) => {
    res.sendFile('/views/index.html', {
      root: __dirname
    });
  });

  app.listen(app.get('port'), () => {
    console.log(`Express server listening on port ${app.get('port')}`);
  });
});

module.exports = app;

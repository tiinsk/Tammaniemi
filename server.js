const config = require('./config');
const express = require('express');
const path = require('path');
const logger = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const fileUpload = require('express-fileupload');

const Flickr = require('flickrapi');

const nodemailer = require('nodemailer');
const markdown = require('nodemailer-markdown').markdown;
const stubTransport = require('nodemailer-stub-transport');

const app = express();

mongoose.Promise = global.Promise;
mongoose.connect(config.database[app.settings.env]);
mongoose.connection.on('error', () => {
  console.info('Error: Could not connect to MongoDB. Did you forget to run `mongod`?');
});

let nodemailerTransport = {};

if (app.settings.env === 'development') {
  nodemailerTransport = nodemailer.createTransport(stubTransport());
  nodemailerTransport.use('compile', markdown());
}

if (app.settings.env === 'production') {
  // Setup production email provider
}


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

if (app.settings.env === 'development') {
  const webpack = require('webpack');
  const webpackMiddleware = require('webpack-dev-middleware');
  const webpackHotMiddleware = require( 'webpack-hot-middleware');
  const webConfig = require('./webpack.dev.config.js');
  const compiler = webpack(webConfig);

  app.use(webpackMiddleware(compiler, {
  hot: true,
  filename: 'bundle.js',
  publicPath: webConfig.output.publicPath,
  stats: {
    colors: true,
    },
    historyApiFallback: true,
  }));
  app.use(webpackHotMiddleware(compiler, {
    log: console.log,
    path: "/__webpack_hmr",
    heartbeat: 10 * 1000,
  }));
}
app.use('/public', express.static(path.join(__dirname, 'public')));
// Routes
require('./routes/auth')(app);
require('./routes/invite')(app, nodemailerTransport);
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

  app.use((err, req, res, next) => {
    /* We log the error internaly */
    console.log(err);
    res.status(500).json(err);
    next();
  });

  app.listen(app.get('port'), () => {
    console.log(`Express server listening on port ${app.get('port')}`);
  });
});

module.exports = app;

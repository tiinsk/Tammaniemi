
var config = require('./config');

var express = require('express');
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var jwt = require('jsonwebtoken');

var passport = require('./routes/passport.js');


mongoose.connect(config.database);
mongoose.connection.on('error', function() {
  console.info('Error: Could not connect to MongoDB. Did you forget to run `mongod`?');
});

var app = express();

app.set('port', process.env.PORT || 3000);
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));


//Routes
require('./routes/user')(app);
require('./routes/post')(app);
require('./routes/task')(app);
require('./routes/infopost')(app);
require('./routes/comment')(app);

// authentication
//app.post('/api/sessions', );

// POST /login
//   This is an alternative implementation that uses a custom callback to
//   achieve the same functionality.


app.post('/api/sessions', function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    if (err) { return next(err) }
    if (!user) {
      return res.json(401, { error: info.message });
    }
    //user has authenticated correctly thus we create a JWT token
    var token = jwt.sign({ name: user.name, id: user._id}, config.jwt_secret);
    res.json({ token : token });

  })(req, res, next);
});

app.get('/*', function(req, res){
	res.sendFile("/views/index.html", {root: __dirname});
})

app.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + app.get('port'));
});

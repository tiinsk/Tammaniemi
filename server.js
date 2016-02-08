/*var swig  = require('swig');
var React = require('react');
var Router = require('react-router');
var routes = require('./app/routes');*/
var config = require('./config');

var express = require('express');
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var jwt = require('jsonwebtoken');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var JwtStrategy = require('passport-jwt').Strategy;

// Models
var User = require('./models/user');

//Routes
var user = require('./routes/user');
var auth = require('./routes/auth');
var posts = require('./routes/post');

passport.use(new LocalStrategy(
	{
		usernameField: 'email',
		passwordField: 'password'
	}, auth.authUser));

var opts ={};
opts.secretOrKey=config.jwt_secret;
passport.use(new JwtStrategy(opts, auth.authUserJWT));

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


// Users
app.get('/api/users', user.getAllUsers);
app.post('/api/users', user.addUser);
app.get('/api/users/:userId', user.getUser);
app.put('/api/users/:userId', user.updateUser);
app.delete('/api/users/:userId', user.deleteUser);


//Posts
app.get('/api/posts', posts.getAllPosts);
app.post('/api/posts', passport.authenticate('jwt', {session: false}), posts.addPost);
app.get('/api/posts/:postId', posts.getPost);
app.put('/api/posts/:postId',  passport.authenticate('jwt', {session: false}), posts.updatePost);
app.delete('/api/posts/:postId', passport.authenticate('jwt', {session: false}), posts.deletePost);

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

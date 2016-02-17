var config = require('../config');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var JwtStrategy = require('passport-jwt').Strategy;
var User = require('../models/user');



function authUser(email, password, done){
	User.findOne({ email: email }, function(err, user) {
	  console.log("user:");
	  console.log(user);
      if (err) { return done(err); }
      if (!user) {
        return done(null, null, { message: 'Incorrect username.' });
      }
      user.comparePassword(password, function(err, isMatch){
      	if (err) { return done(err);}
      	else if (isMatch) {
      		return done(null, user);
      	}
      	return done(null, null, {message: "Incorrect email"} );
      });
    });

};

function authUserJWT(jwtPayload, done){
	console.log(jwtPayload);
	User.findById(jwtPayload.id, function(err, user){
		if (err) {
 			return done(err, false);
 		}
		if (user) {
			return done(null, user);
		}
 		else{
 			return done(null, false);
 		}
 	});
};


passport.use(new LocalStrategy(
  {
    usernameField: 'email',
    passwordField: 'password'
  }, authUser));

var opts ={};
opts.secretOrKey=config.jwt_secret;
passport.use(new JwtStrategy(opts, authUserJWT));

module.exports = passport;

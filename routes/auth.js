var User = require('../models/user');

exports.authUser = function(email, password, done){
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

exports.authUserJWT = function(jwtPayload, done){
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
var User = require('../models/user');

module.exports = function(app) {

  /*
   * GET all user information
   */
  app.get('/api/users', function(req, res) {
    User.find({}, function(err, users) {
      if (err) {
        res.sendStatus(500);
        return;
      }
      if (users === null) {
        res.status(404).send({
          message: "No users found"
        });
        return;
      }
      res.json(users);
    });
  });

  /*
   * GET user information
   */
  app.get('/api/users/:userId', function(req, res) {

    User.findById(req.params.userId, "_id name email password", function(err, user) {
      if (err) {
        res.sendStatus(500);
        return;
      }
      if (user === null) {
        res.status(404).send({
          message: "User not found"
        });
        return;
      }
      res.json(user);

    });
  });

  /*
   * POST add new user
   */
  app.post('/api/users', function(req, res) {

    var addUser = req.body;

    if (addUser.name === undefined || addUser.password === undefined || addUser.email === undefined) {
      res.status(400).send({
        message: "Invalid user data"
      });
      return;
    };

    User.findOne({
      email: addUser.email
    }, function(err, user) {
      if (err) {
        console.log(err);
        res.sendStatus(500);
        return;
      }

      if (user) {
        res.status(403).send({
          message: "User already exists"
        });
        return;
      };

      var newUser = new User(addUser);

      newUser.save(function(err, user) {
        if (err) {
          console.log(err);
          res.status(500).send({
            message: "Creation failed"
          });
          return;
        }
        res.send(201);

      });
    });
  });

  /*
   * PUT update user information
   */
  app.put('/api/users/:userId', function(req, res) {

    var updatedUser = req.body;

    User.findById(req.params.userId, function(err, user) {
      if (err) {
        res.sendStatus(500);
        return;
      }

      if (!user) {
        res.status(404).send({
          message: "User not found"
        });
        return;
      };

      /*
          if(req.user.username !== user.username){
            res.send(403);
            return;
          }

          if (updatedUser.password === undefined || updatedUser.email === undefined || updatedUser.name === undefined ) {
            res.send(400);
            return;
          }
          if(updatedUser.newpassword !== '' && updatedUser.newpassword !== undefined){
            updatedUser.password = updatedUser.newpassword;
          }
          delete updatedUser.newpassword;
      */
      user.update(updatedUser, function(err) {
        if (err) {
          res.sendStatus(500);
          return;
        }
        res.send(200);

      });
    });
  });

  /*
   * DELETE user
   */
  app.delete('/api/users/:userId', function(req, res) {
    /*
    User.findOne({userId: req.params.userId}, function(err, user){
      if (err) {
        res.sendStatus(500);
        return;
      }

      if (!user) {
        res.status(404).send({message: "User not found"});
        return;
      };

      if(req.user.username !== user.username){
        res.send(403);
        return;
      };


      user.update({status: false}, function(err){
        if (err) {
          res.sendStatus(500);
          return;
        }
        req.logout();
        res.send(200);

      });
    });
    */
  });

};

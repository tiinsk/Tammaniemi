var Task = require('../models/task');
var passport = require('./passport.js');

module.exports = function(app) {

  //Tasks
  app.get('/api/tasks', function(req, res) {

    Task.find({}, function(err, tasks) {
      if (err) {
        res.sendStatus(500);
        return;
      }
      if (tasks.length == 0) {
        res.status(404).send({
          message: "No tasks found"
        });
        return;
      }
      res.json(tasks);
    })
  });

  /*
   * GET task information
   */
  app.get('/api/tasks/:taskId', function(req, res) {

    Task.findById(req.params.taskId, "_id title category comments userId createdAt", function(err, task) {
      if (err) {
        res.status(500).send({
          message: "Task not found"
        });
        return;
      }
      if (task === null) {
        res.status(404).send({
          message: "Task not found"
        });
        return;
      }
      res.json(task);

    });
  });

  /*
   * POST add new task
   */
  app.post('/api/tasks', passport.authenticate('jwt', {
    session: false
  }), function(req, res) {
    var addTask = req.body;
    addTask.userId = req.user._id;

    if (addTask.title === undefined || addTask.category === undefined) {
      res.status(400).send({
        message: "Invalid task data"
      });
      return;
    };

    var newTask = new Task(addTask);

    newTask.save(function(err, task) {
      if (err) {
        res.status(500).send({
          message: "Creation failed"
        });
        return;
      }

      res.status(201).json({
        id: task.id
      });

    });

  });
  /*
   * PUT update task
   */
  app.put('/api/tasks/:taskId', passport.authenticate('jwt', {
    session: false
  }), function(req, res) {

    var updatedTask = req.body;

    if (updatedTask.title === undefined || updatedTask.category === undefined) {
      res.status(400).send({
        message: "Invalid task data"
      });
      return;
    };

    Task.findById(req.params.taskId, function(err, task) {
      if (err) {
        res.sendStatus(500);
        return;
      }

      if (!task) {
        res.status(404).send({
          message: "Task not found"
        });
        return;
      };

      if (!req.user._id.equals(task.userId)) {
        res.status(403).send({
          message: "Unauthorized"
        });
        return;
      }

      task.update(updatedTask, function(err) {
        if (err) {
          res.sendStatus(500);
          return;
        }
        res.sendStatus(200);

      });
    });
  });

  /*
   * DELETE task
   */
  app.delete('/api/tasks/:taskId', passport.authenticate('jwt', {
    session: false
  }), function(req, res) {
    Task.findById(req.params.taskId, function(err, task) {
      if (err) {
        res.sendStatus(500);
        return;
      }

      if (!task) {
        res.status(404).send({
          message: "Task not found"
        });
        return;
      };

      if (!req.user._id.equals(task.userId)) {
        res.status(403).send({
          message: "Unauthorized"
        });
        return;
      };

      task.remove(function(err) {
        if (err) {
          res.sendStatus(500);
          return;
        }
        res.sendStatus(200);
      });
    });
  });


};

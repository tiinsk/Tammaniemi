const Task = require('../models/task');
const passport = require('./passport.js');

module.exports = (app) => {
  app.get('/api/Task', passport.authenticate('jwt', {
    session: false,
  }), (req, res) => {
    Task.find({})
    .populate({
      path: 'comments',
      populate: {
        path: 'userId'
      }
    })
    .populate('userId')
    .populate('doneByUser')
    .exec((err, tasks) => {
      if (err) {
        res.sendStatus(500);
        return;
      }

      if (tasks.length === 0) {
        res.status(404).send({
          message: 'No tasks found'
        });
        return;
      }
      res.json(tasks);
    });
  });

  /*
   * GET task information
   */
  app.get('/api/Task/:taskId', passport.authenticate('jwt', {
    session: false
  }), (req, res) => {
    Task.findById(req.params.taskId, '_id title category comments userId createdAt')
    .populate({
      path: 'comments',
      populate: {
        path: 'userId'
      }
    })
    .populate('userId')
    .populate('doneByUser')
    .exec((err, task) => {
      if (err) {
        res.status(500).send({
          message: 'Task not found'
        });
        return;
      }

      if (task === null) {
        res.status(404).send({
          message: 'Task not found'
        });
        return;
      }
      res.json(task);
    });
  });

  /*
   * POST add new task
   */
  app.post('/api/Task', passport.authenticate('jwt', {
    session: false
  }), (req, res) => {
    const addTask = req.body;
    addTask.userId = req.user._id;

    if (addTask.title === undefined || addTask.category === undefined) {
      res.status(400).send({
        message: 'Invalid task data'
      });
      return;
    }

    const newTask = new Task(addTask);

    newTask.save((err, task) => {
      if (err) {
        res.status(500).send({
          message: 'Creation failed'
        });
        return;
      }

      res.status(201).json(task);
    });
  });

  /*
   * PUT update task
   */
  app.put('/api/Task/:taskId', passport.authenticate('jwt', {
    session: false
  }), (req, res) => {
    const updatedTask = req.body;

    Task.findById(req.params.taskId, (err, task) => {
      if (err) {
        res.sendStatus(500);
        return;
      }

      if (!task) {
        res.status(404).send({
          message: 'Task not found'
        });
        return;
      }

      if (!req.user._id.equals(task.userId)) {
        task.isDone = updatedTask.isDone;
        task.doneByUser = updatedTask.doneByUser;
      } else {
        Object.assign(task, updatedTask);
      }

      task.save((err) => {
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
  app.delete('/api/Task/:taskId', passport.authenticate('jwt', {
    session: false
  }), (req, res) => {
    Task.findById(req.params.taskId, (err, task) => {
      if (err) {
        res.sendStatus(500);
        return;
      }

      if (!task) {
        res.status(404).send({
          message: 'Task not found'
        });
        return;
      }

      if (!req.user._id.equals(task.userId)) {
        res.status(403).send({
          message: 'Unauthorized'
        });
        return;
      }

      task.remove((err) => {
        if (err) {
          res.sendStatus(500);
          return;
        }
        res.sendStatus(200);
      });
    });
  });
};

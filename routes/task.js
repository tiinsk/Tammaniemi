const Task = require('../models/task');
const passport = require('./passport.js');

module.exports = (app) => {
  app.get('/api/tasks', passport.authenticate('jwt', {
    session: false,
  }), (req, res) => {
    Task.find({})
    .populate('comments')
    .populate('userId')
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
  app.get('/api/tasks/:taskId', passport.authenticate('jwt', {
    session: false
  }), (req, res) => {
    Task.findById(req.params.taskId, '_id title category comments userId createdAt')
    .populate('comments')
    .populate('userId')
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
  app.post('/api/tasks', passport.authenticate('jwt', {
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
  app.put('/api/tasks/:taskId', passport.authenticate('jwt', {
    session: false
  }), (req, res) => {
    const updatedTask = req.body;

    if (updatedTask.title === undefined || updatedTask.category === undefined) {
      res.status(400).send({
        message: 'Invalid task data'
      });
      return;
    }

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

      task.update(updatedTask, (err) => {
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

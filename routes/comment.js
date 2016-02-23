var Event = require('../models/event');
var Comment = require('../models/comment');
var passport = require('./passport.js');

module.exports = function(app) {
	/*
	 * Add new Comment
	 */
	app.post('/api/comments', passport.authenticate('jwt', {
		session: false
	}), function(req, res) {
		var addComment = req.body;
		addComment.userId = req.user._id;

		if (addComment.eventId == undefined || addComment.content === undefined) {
			res.status(400).send({
				message: "Invalid comment data"
			});
			return;
		};

		Event.findById(addComment.eventId, function(err, event) {
			if (err) {
				res.status(500).send({
					message: "Event not found"
				});
				return;
			}
			if (event === null) {
				res.status(404).send({
					message: "Event not found"
				});
				return;
			}

			var newComment = new Comment(addComment);

			newComment.save(function(err, comment) {
				if (err) {
					res.status(500).send({
						message: "Creation failed"
					});
					return;
				}

				event.update({
					$push: {
						comments: comment._id
					}
				}, function(err) {
					if (err) {
						res.send(500);
						return;
					}
					res.status(201).json(comment);
				});


			});
		});
	});

	app.put('/api/comments/:commentId', passport.authenticate('jwt', {
		session: false
	}), function(req, res) {
		var updatedComment = req.body;

		if (updatedComment.eventId === undefined || updatedComment.userId === undefined || updatedComment.content === undefined) {
			res.status(400).send({
				message: "Invalid comment data"
			});
			return;
		};

		Comment.findById(updatedComment._id, function(err, comment) {
			if (err) {
				res.send(500);
				return;
			}

			if (!comment) {
				res.status(404).send({
					message: "Comment not found"
				});
				return;
			};

			if (!req.user._id.equals(comment.userId)) {
				res.status(403).send({
					message: "Unauthorized"
				});
				return;
			}

			comment.update(updatedComment, function(err) {
				if (err) {
					res.send(500);
					return;
				}
				res.send(200);

			});
		});
	});

	app.delete('/api/comments/:commentId', passport.authenticate('jwt', {
		session: false
	}), function(req, res) {
		Comment.findById(req.params.commentId, function(err, comment) {
			if (err) {
				res.send(500);
				return;
			}

			if (!comment) {
				res.status(404).send({
					message: "Comment not found"
				});
				return;
			};

			if (!req.user._id.equals(comment.userId)) {
				res.status(403).send({
					message: "Unauthorized"
				});
				return;
			};


			comment.remove(function(err) {
				if (err) {
					res.send(500);
					return;
				}
				res.send(200);
			});
		});

	});

};

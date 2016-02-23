var InfoPost = require('../models/infopost');
var passport = require('./passport.js');

//Infoposts
module.exports = function(app) {


	app.get('/api/infoposts', function(req, res) {

		InfoPost.find({}, function(err, infoposts) {
			if (err) {
				res.send(500);
				return;
			}
			if (infoposts.length == 0) {
				res.status(404).send({
					message: "No infoposts found"
				});
				return;
			}
			res.json(infoposts);
		})
	});



	/*
	 * GET post information
	 */
	app.get('/api/infoposts/:infopostId', function(req, res) {

		InfoPost.findById(req.params.infopostId, "_id title category content comments userId createdAt")
			.populate('comments')
			.exec(function(err, infopost) {
				if (err) {
					res.status(500).send({
						message: "Infopost not found"
					});
					return;
				}
				if (infopost === null) {
					res.status(404).send({
						message: "Infopost not found"
					});
					return;
				}
				res.json(infopost);

			});
	});

	/*
	 * POST add new post
	 */
	app.post('/api/infoposts', passport.authenticate('jwt', {
		session: false
	}), function(req, res) {
		var addInfoPost = req.body;
		addInfoPost.userId = req.user._id;

		if (addInfoPost.title === undefined || addInfoPost.content === undefined) {
			res.status(400).send({
				message: "Invalid infopost data"
			});
			return;
		};


		var newInfoPost = new InfoPost(addInfoPost);

		newInfoPost.save(function(err, infopost) {
			if (err) {
				res.status(500).send({
					message: "Creation failed"
				});
				return;
			}

			res.status(201).json({
				id: infopost.id
			});

		});
	});

	/*
	 * PUT update post
	 */
	app.put('/api/infoposts/:infopostId', passport.authenticate('jwt', {
		session: false
	}), function(req, res) {

		var updatedInfoPost = req.body;

		if (updatedInfoPost.title === undefined || updatedInfoPost.content === undefined) {
			res.status(400).send({
				message: "Invalid infopost data"
			});
			return;
		};

		InfoPost.findById(req.params.infopostId, function(err, infopost) {
			if (err) {
				res.send(500);
				return;
			}

			if (!infopost) {
				res.status(404).send({
					message: "Infopost not found"
				});
				return;
			};

			if (!req.user._id.equals(infopost.userId)) {
				res.status(403).send({
					message: "Unauthorized"
				});
				return;
			}

			infopost.update(updatedInfoPost, function(err) {
				if (err) {
					res.send(500);
					return;
				}
				res.send(200);
			});
		});
	});

	/*
	 * DELETE infopost
	 */
	app.delete('/api/infoposts/:infopostId', passport.authenticate('jwt', {
		session: false
	}), function(req, res) {
		InfoPost.findById(req.params.infopostId, function(err, infopost) {
			if (err) {
				res.send(500);
				return;
			}

			if (!infopost) {
				res.status(404).send({
					message: "Infopost not found"
				});
				return;
			};

			if (!req.user._id.equals(infopost.userId)) {
				res.status(403).send({
					message: "Unauthorized"
				});
				return;
			};


			infopost.remove(function(err) {
				if (err) {
					res.send(500);
					return;
				}
				res.send(200);
			});
		});
	});

};

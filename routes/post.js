var Post = require('../models/post');

exports.getAllPosts = function(req, res){

	Post.find({}, function(err, posts){
		if (err) {
			res.send(500);
			return;
		}
		if (posts.length == 0) {
			res.status(404).send({message: "No posts found"});
			return;
		}
		res.json(posts);
	})
};


 /*
  * GET post information
  */
 exports.getPost = function(req, res){

 	Post.findById(req.params.postId, "_id title content comments userId createdAt")
 		.populate('comments')
 		.exec( function(err, post){
 		if (err) {
 			res.status(500).send({message: "Post not found"});
 			return;
 		}
		if (post === null) {
			res.status(404).send({message: "Post not found"});
			return;
		}
 		res.json(post);

 	});
 };

 /*
  * POST add new post
  */
 exports.addPost = function(req, res){
 	var addPost= req.body;
 	addPost.userId = req.user._id;

 	if (addPost.title === undefined || addPost.content === undefined) {
 		res.status(400).send({message: "Invalid post data"});
 		return;
 	};


	var newPost = new Post(addPost);

	newPost.save(function(err, post){
		if (err) {
			res.status(500).send({message: "Creation failed"});
			return;
		}

		res.status(201).json({id: post.id});

	});

 };

 /*
  * PUT update post
  */
 exports.updatePost = function(req, res){

 	var updatedPost = req.body;

 	if (updatedPost.title === undefined || updatedPost.content === undefined) {
		 res.status(400).send({message: "Invalid post data"});
		 return;
	};

  	Post.findById(req.params.postId, function(err, post){
 		if (err) {
 			res.send(500);
 			return;
 		}

 		if (!post) {
 			res.status(404).send({message: "Post not found"});
 			return;
 		};

 		if(!req.user._id.equals(post.userId)){
 			res.status(403).send({message: "Unauthorized"});
 			return;
 		}

		post.update(updatedPost, function(err){
			if (err) {
				res.send(500);
				return;
			}
			res.send(200);

		});
	});
 };

 /*
  * DELETE post
  */

 
 exports.deletePost = function(req, res){
 	Post.findById(req.params.postId, function(err, post){
 		if (err) {
 			res.send(500);
 			return;
 		}

 		if (!post) {
 			res.status(404).send({message: "Post not found"});
 			return;
 		};

 		if(!req.user._id.equals(post.userId)){
 			res.status(403).send({message: "Unauthorized"});
 			return;
 		};

 		
		post.remove( function(err){
			if (err) {
				res.send(500);
				return;
			}
			res.send(200);
		});
	});
	
 };


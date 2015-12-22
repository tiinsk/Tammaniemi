var mongoose = require('mongoose');
var Event = require('./event');

var postSchema = Event.discriminator( 'Post', new mongoose.Schema({
	content: {
		type: String, 
		required: true 
	}}));

module.exports = mongoose.model('Post', postSchema);
var mongoose = require('mongoose');
var Event = require('./event');

module.exports = Event.discriminator( 'Post', new mongoose.Schema({
	content: {
		type: String,
		required: true
	}}));

var mongoose = require('mongoose');
var Event = require('./event');

module.exports =Event.discriminator( 'InfoPost', new mongoose.Schema({
	content: {
		type: String,
		required: true
	},
	category: {
		type: Number,
		required: true,
		default: 1
	}

}));

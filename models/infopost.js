var mongoose = require('mongoose');
var Event = require('./event');

var infoPostSchema = Event.discriminator( 'InfoPost', new mongoose.Schema({
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

module.exports = mongoose.model('InfoPost', infoPostSchema);
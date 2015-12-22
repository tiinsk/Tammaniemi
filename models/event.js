var mongoose = require('mongoose');

var eventSchema = new mongoose.Schema({
	title: {
		type: String, 
		required: true 
	},
	userId: {
		type: mongoose.Schema.Types.ObjectId, 
		required: true, 
		ref: 'User' 
	},
	createdAt: {
		type: Date, 
		required: true,
		default: Date.now
	},
	comments: [{
		type: mongoose.Schema.Types.ObjectId, 
		ref: 'Comment'
	}]
});

module.exports = mongoose.model('Event', eventSchema);
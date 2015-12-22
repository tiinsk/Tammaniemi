var mongoose = require('mongoose');

var commentSchema = new mongoose.Schema({
	content: {
		type: String, 
		required: true 
	},
	userId: {
		type: Schema.Types.ObjectId, 
		required: true, 
		ref: 'User' 
	},
	eventId: {
		type: Schema.Types.ObjectId, 
		required: true, 
		ref: 'Event' 
	},
	createdAt: {
		type: Date, 
		required: true,
		default: Date.now
	}
});

module.exports = mongoose.model('Comment', commentSchema);
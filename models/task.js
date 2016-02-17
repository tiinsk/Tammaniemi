var mongoose = require('mongoose');
var Event = require('./event');

var taskSchema = Event.discriminator( 'Task', new mongoose.Schema({
	category: {
		type: Number,
		required: true,
		default: 1
	}

}));

module.exports = mongoose.model('Task', taskSchema);

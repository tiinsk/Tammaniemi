var mongoose = require('mongoose');
var Event = require('./event');

var reservationSchema = Event.discriminator( 'Reservation', new mongoose.Schema({
	startDate: {
		type: Date, 
		required: true 
	},
	endDate: {
		type: Date,
		required: true,
	}

}));

module.exports = mongoose.model('InfoPost', infoPostSchema);
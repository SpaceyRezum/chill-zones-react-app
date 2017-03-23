var mongoose = require('mongoose');

var LocationSchema = new mongoose.Schema({
	locationTypeDesc: String,
	locationDesc: String,
	locationName: String,
	address: String,
	phone: String,
	lat: Number,
	lon: Number

});

// first arg is naming export object/model, second is passing the schema
module.exports = mongoose.model('Location', LocationSchema);
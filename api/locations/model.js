var mongoose = require('mongoose');

var LocationSchema = new mongoose.Schema({

   name: String,
   address: {
   	lat: Number,
   	lon: Number
   },
   category: String,
   phone: String
});

// first arg is naming export object/model, second is passing the schema
module.exports = mongoose.model('Location', LocationSchema);
var mongoose = require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose');

var UserSchema = new mongoose.Schema({
  name: {
  	type: String,
    required: true
  },
  email: {
  	type: String,
    required: true
  },
  hash: String,
  salt: String
});

UserSchema.plugin(passportLocalMongoose, { usernameField: 'email'});

module.exports = mongoose.model('User', UserSchema);
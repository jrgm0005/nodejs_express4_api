// User.js
var mongoose = require('mongoose'),
Schema   = mongoose.Schema;

var User = new Schema({
  name:     { type: String },
  email:    { type: String },
  password: { type: String }
});

module.exports = mongoose.model('user', User);

'use strict'

var mongoose = require('mongoose');

var schema = mongoose.Schema;

var UserSchema = schema({
  name: String,
});

module.exports = mongoose.model('User',UserSchema);

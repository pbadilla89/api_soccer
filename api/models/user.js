'use strict'

var mongoose = require('mongoose');

var schema = mongoose.Schema;

var UserSchema = schema({
  name: String,
  lastname: String,
  email: String,
  password: String,
  role: String,
  teams: [{
    type: schema.ObjectId,
    ref: 'Team'
  }]
})

module.exports = mongoose.model('User',UserSchema)

'use strict'

var mongoose = require('mongoose');

var schema = mongoose.Schema;

var TeamSchema = schema({
  name: String,
  win: String,
  idHome: {
    type: schema.ObjectId,
    ref: 'Team'
  },
  idAway: {
    type: schema.ObjectId,
    ref: 'Team'
  },
  league: {
    type: schema.ObjectId,
    ref: 'League'
  }
});

module.exports = mongoose.model('Team',TeamSchema);

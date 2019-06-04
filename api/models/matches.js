'use strict'

var mongoose = require('mongoose');

var schema = mongoose.Schema;

var MatchSchema = schema({
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

module.exports = mongoose.model('Match',MatchSchema);

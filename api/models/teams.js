'use strict'

var mongoose = require('mongoose');

var schema = mongoose.Schema;

var TeamSchema = schema({
  name: String,
  country_id: {
    type: schema.ObjectId,
    ref: 'Country'
  },
  pos: Number,
  pts: Number,
  country: String,
  league: String,
  pj: Number,
  pg: Number,
  pe: Number,
  pp: Number,
  league_id: {
    type: schema.ObjectId,
    ref: 'League'
  },
});

module.exports = mongoose.model('Team',TeamSchema);

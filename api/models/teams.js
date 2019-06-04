'use strict'

var mongoose = require('mongoose');

var schema = mongoose.Schema;

var TeamSchema = schema({
  name: String,
  country: {
    type: schema.ObjectId,
    ref: 'Country'
  },
  pts: Number,
  pj: Number,
  pg: Number,
  pe: Number,
  pp: Number,
  league: {
    type: schema.ObjectId,
    ref: 'League'
  },
});

module.exports = mongoose.model('Team',TeamSchema);

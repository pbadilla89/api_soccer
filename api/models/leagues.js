'use strict'

var mongoose = require('mongoose');

var schema = mongoose.Schema;

var LeagueSchema = schema({
  name: String,
  country: {
    type: schema.ObjectId,
    ref: 'Country'
  },
});

module.exports = mongoose.model('League',LeagueSchema);

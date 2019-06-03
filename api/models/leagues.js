'use strict'

var mongoose = require('mongoose');

var schema = mongoose.Schema;

var LeagueSchema = schema({
  name: String,
  country_id: {
    type: schema.ObjectId,
    ref: 'Country'
  },
});

module.exports = mongoose.model('League',LeagueSchema);

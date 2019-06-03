'use strict'

var mongoose = require('mongoose');

var schema = mongoose.Schema;

var CountrySchema = schema({
  name: String,
});

module.exports = mongoose.model('Country',CountrySchema);

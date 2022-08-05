'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Solutionschema = new Schema({
  retrieveid:{
    type: String
  },
  Created_date: {
    type: Date,
    default: Date.now
  },
  data: {
        type: String
  },
  values: {
        type: Array
  },
  uid:{
    type: String
  }
});

module.exports = mongoose.model('Solution', Solutionschema);

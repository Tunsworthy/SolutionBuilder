'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ECXschema = new Schema({
  name: {
        type: String
  },
  metros: {},
  Encapsulation:{
    type: String
  },
  description: {
    type: String
  },
  authKeyLabel:{
    type: String
  }
});

module.exports = mongoose.model('ECX', ECXschema);

'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ECXschema = new Schema({
  name: {
        type: String
  },
  uuid: {
    type: String
  },
  metros: {
    type: Array
  },
  Encapsulation:{
    type: String
  },
  description: {
    type: String
  },
  authKeyLabel:{
    type: String
  },
  speedbands:{
    type: Array
  }
});

module.exports = mongoose.model('ECX', ECXschema);

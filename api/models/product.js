'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Productschema = new Schema({
  name: {
        type: String
  },
  category: {
    type: String
  },
  type:{
    type: String
  },
  layout:{
    type: Number
  },
  upfront:{
    type: Number
  },
  details: {},
  addons:{}
});

module.exports = mongoose.model('Product', Productschema);

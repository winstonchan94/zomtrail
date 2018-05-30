
'use strict';
//import dependency
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let UserSchema = new Schema(
  {
    name: String,
    email: String,
    score: Number,
    currentPathId: Number
  }
);

module.exports = mongoose.model('User', UserSchema);


'use strict';
//import dependency
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let UserSchema = new Schema(
  {
    name: String,
    email: String,
    provider: String,
    provider_id: String,
    token: String,
    provider_pic: String
  }
);

module.exports = mongoose.model('User', UserSchema);

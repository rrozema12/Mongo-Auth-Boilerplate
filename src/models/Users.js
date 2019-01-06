'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const usersSchema = new Schema('User', {
   username: String,
   password: String,
   email: String,
   gender: String,
   address: String
});

module.exports = mongoose.model('Users', usersSchema);
'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const usersSchema = new Schema({
   googleId: String,
   firstName: String,
   lastName: String,
   email: String
});

module.exports = mongoose.model('User', usersSchema);
'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const googleUsersSchema = new Schema({
   googleId: String
});

module.exports = mongoose.model('GoogleUser', googleUsersSchema);
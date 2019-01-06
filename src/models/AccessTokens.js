'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const accessTokenSchema = new Schema('AccessToken', {
   id: String,
   createdAt: {
      type: Date,
      default: new Date()
   },
   updatedAt: Date,
   deletedAt: Date,
   dateExpired: Date,
   clientId: String,
   userId: String,
   token: String
});

module.exports = mongoose.model('AccessTokens', accessTokenSchema);



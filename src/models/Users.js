'use strict';

const mongoose = require('mongoose'),
   bcrypt = require('bcrypt'),
   Schema = mongoose.Schema;

/**
 * User Schema
 */
const UserSchema = new Schema({
   name: {
      type: String,
      trim: true,
      required: true
   },
   email: {
      type: String,
      unique: true,
      lowercase: true,
      trim: true,
      required: true
   },
   password: {
      type: String
   },
   created: {
      type: Date,
      default: Date.now
   },
   edited: {
      type: Date,
   },
   token: {
      type: String
   }
});

UserSchema.methods.comparePassword = function(password) {
   return bcrypt.compareSync(password, this.password);
};


module.exports = mongoose.model('Users', UserSchema);
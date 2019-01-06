'use strict';

const models = require("../../models/index");
const GenericError = require('../../utils/errors').GenericError;
const UserModel = models.Users;

const MongoUserDao = (() => {

   return {
      insertUser: (data) => {
         if (!data.hasOwnProperty("username")) {
            throw new GenericError(3000, "No username provided");
         }
         if (!data.hasOwnProperty("password")) {
            throw new GenericError(3001, "No password provided");
         }
         if (!data.hasOwnProperty("email")) {
            throw new GenericError(3002, "No email provided");
         }
         try {
            return UserModel.create(data);
         } catch (err) {
            throw new GenericError(3003, err)
         }
      },

      findUserByEmail: async (email) => {
         if (!email) {
            throw new GenericError(3000, "No email provided");
         }
         try {
            return UserModel.findOne({ email: email });
         } catch (err) {
            throw new GenericError(3001, err)
         }
      }

   };
})();

module.exports = MongoUserDao;

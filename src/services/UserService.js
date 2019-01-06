'use strict';

const UserDao = require('../dao/UserDao');
const GenericError = require('../utils/errors').GenericError;

const UserService = (() => {
   return {
      createUser: (data) => {
         if (!data.hasOwnProperty("username")) {
            throw new GenericError(2000, "No username provided");
         }
         if (!data.hasOwnProperty("password")) {
            throw new GenericError(2001, "No password provided");
         }
         if (!data.hasOwnProperty("email")) {
            throw new GenericError(2002, "No email provided");
         }
         try {
            return UserDao.insertUser(data);
         } catch (err) {
            throw new GenericError(2003, err);
         }
      },

      getUserByEmail: async (email) => {
         if (!email) {
            throw new GenericError(1000, "No email provided")
         }
         try {
            return UserDao.findUserByEmail(email);
         } catch (err) {
            throw err
         }
      }
   }
})();

module.exports = UserService;

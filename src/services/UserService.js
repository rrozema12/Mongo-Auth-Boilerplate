'use strict';

const UserDao = require('../dao/UserDao');
const GenericError = require('../utils/errors').GenericError;

const UserService = (() => {
   return {
      createUser: (data) => {
         try {
            return UserDao.createUser(data);
         } catch (err) {
            throw new GenericError(2003, err);
         }
      },

      findUserByGoogleId: async (id) => {
         if (!id) {
            throw new GenericError(1000, "No Google ID provided")
         }
         try {
            return UserDao.findUserByGoogleId(id);
         } catch (err) {
            throw err
         }
      },

      findUserById: async (id) => {
         if (!id) {
            throw new GenericError(1000, "No email provided")
         }
         try {
            return UserDao.findUserById(id);
         } catch (err) {
            throw err
         }
      }
   }
})();

module.exports = UserService;

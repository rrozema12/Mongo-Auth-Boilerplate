'use strict';

const UserDao = require('../dao/UserDao');
const GenericError = require('../utils/errors').GenericError;

const AuthService = (() => {
   return {
      createUser: (data) => {
         try {
            return UserDao.createUser(data);
         } catch (err) {
            throw new GenericError(2003, err);
         }
      },

      authenticateUserByEmail: (data) => {
         try {
            return UserDao.authenticateUserByEmail(data);
         } catch (err) {
            throw new GenericError(2003, err);
         }
      }
   }
})();

module.exports = AuthService;

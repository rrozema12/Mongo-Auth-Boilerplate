'use strict';

const UserDao = require('../dao/UserDao');
const GenericError = require('../utils/errors').GenericError;

const UserService = (() => {
   return {
      findUserByEmail: async (id) => {
         if (!id) {
            throw new GenericError(1000, "No email provided")
         }
         try {
            return UserDao.findUserByEmail(id);
         } catch (err) {
            throw err
         }
      }
   }
})();

module.exports = UserService;

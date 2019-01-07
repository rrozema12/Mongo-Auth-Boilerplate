'use strict';

const models = require("../../models/index");
const GenericError = require('../../utils/errors').GenericError;
const UsersModel = models.Users;

const MongoUserDao = (() => {

   return {
      createUser: async (data) => {
         try {
            return UsersModel.create(data);
         } catch (err) {
            throw new GenericError(3003, err)
         }
      },

      findUserByGoogleId: async (id) => {
         try {
            return UsersModel.findOne({googleId: id});
         } catch (err) {
            throw new GenericError(3001, err)
         }
      },

      findUserById: async (id) => {
         try {
            return UsersModel.findById(id);
         } catch (err) {
            throw new GenericError(3001, err)
         }
      }

   };
})();

module.exports = MongoUserDao;

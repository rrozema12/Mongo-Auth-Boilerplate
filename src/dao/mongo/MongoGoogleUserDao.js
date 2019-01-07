'use strict';

const models = require("../../models/index");
const GenericError = require('../../utils/errors').GenericError;
const GoogleUserModel = models.GoogleUsers;

const MongoGoogleUserDao = (() => {

   return {
      insertGoogleUser: async (data) => {
         try {
            const response = await GoogleUserModel.create(data);
            return response;
         } catch (err) {
            throw new GenericError(3003, err)
         }
      },

      findGoogleUserById: async (id) => {
         try {
            const response = await GoogleUserModel.findOne({ googleId: id });
            return response;
         } catch (err) {
            throw new GenericError(3001, err)
         }
      },

      findGoogleUserByUserId: async (id) => {
         try {
            const response = await GoogleUserModel.findById(id);
            return response;
         } catch (err) {
            throw new GenericError(3001, err)
         }
      }

   };
})();

module.exports = MongoGoogleUserDao;

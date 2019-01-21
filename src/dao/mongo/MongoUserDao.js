'use strict';

const models = require("../../models/index");
const GenericError = require('../../utils/errors').GenericError;
const UsersModel = models.Users;
const jwt = require('jsonwebtoken'),
   bcrypt = require('bcrypt');
const keys = require('../../../config/keys');

const MongoUserDao = (() => {

   return {
      createUser: async (data) => {
         data.password = bcrypt.hashSync(data.password, 10);
         data.token = jwt.sign({ email: data.email, name: data.name, _id: data._id }, keys.token, {
               expiresIn: 86400 // expires in 24 hours
            });
         console.log(data);
         try {
            return UsersModel.create(data);
         } catch (err) {
            throw new GenericError(3003, err)
         }
      },

      authenticateUserByEmail: async (data) => {
         let user = await UsersModel.findOne({ email: data.email });

         if (!user || !user.comparePassword(data.password)) {
            return ({ message: 'Authentication failed. Invalid user or password.' });
         }

         return { token: jwt.sign({ email: data.email, name: data.name, _id: data._id }, keys.token, {
               expiresIn: 86400 // expires in 24 hours
            })};
      },

      findUserByEmail: async email => {
         let user = await UsersModel.findOne({ email });
         return user
      }
   };
})();

module.exports = MongoUserDao;

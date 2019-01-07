'use strict';

const passport = require('passport');
const AuthError = require('./errors').AuthError;
const GoogleStragegy = require('passport-google-oauth20').Strategy;
const keys = require('../../config/keys');

const UserService = require('../services/UserService');

const AuthTool = (() => {
   return {
      authAccessToken: (req, res, next) => {
         passport.authenticate('google', {
            scope: ['email']
         }, (err, user, info) => {
            if (err) {
               const responseObject = {
                  code: err.code,
                  message: err.message
               };

               return res
                  .status(err.status || 500)
                  .json(responseObject);
            }

            if (!user) {
               return res
                  .status(403)
                  .json(new AuthError(4000, 'Unauthorized', 403));
            }

            req.user = user;
            req.authInfo = info;
            next();
         })(req, res, next);
      },
   };
})();

module.exports = AuthTool;

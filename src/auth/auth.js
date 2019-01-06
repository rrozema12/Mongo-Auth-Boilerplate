'use strict';

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const BasicStrategy = require('passport-http').BasicStrategy;
const ClientPasswordStrategy = require('passport-oauth2-client-password').Strategy;
const BearerStrategy = require('passport-http-bearer').Strategy;

const AuthError = require('../utils/errors').AuthError;

const Auth = (() => {


   passport.serializeUser(function(user, done) {
      done(null, user.id || 'blah');
   });


   passport.deserializeUser(function(id, done) {
      // User.findById(id, function (err, user) {
      done(null, id);
      // });
   });

   /**
    * BasicStrategy & ClientPasswordStrategy
    *
    * These strategies are used to authenticate registered OAuth clients.  They are
    * employed to protect the `token` endpoint, which consumers use to obtain
    * access tokens.  The OAuth 2.0 specification suggests that clients use the
    * HTTP Basic scheme to authenticate.  Use of the client password strategy
    * allows clients to send the same credentials in the request body (as opposed
    * to the `Authorization` header).  While this approach is not recommended by
    * the specification, in practice it is quite common.
    */
   passport.use(new BasicStrategy(
      async (username, password, done) => {
         try {
            const client = await OauthClientService.findByClientName(username);
            if (!client) {
               return done(new AuthError(4100, 'Unauthorized: Invalid authorization client'));
            }

            if (client.clientSecret !== password) {
               return done(new AuthError(4101, 'Unauthorized: Invalid authorization client credentials'));
            }

            return done(null, client);
         } catch (err) {
            return done(err);
         }
      }));



   /**
    * BearerStrategy
    *
    * This strategy is used to authenticate users based on an access token (aka a
    * bearer token).  The user must have previously authorized a client
    * application, which is issued an access token to make requests on behalf of
    * the authorizing user.
    */
   passport.use('accessToken', new BearerStrategy(
      { passReqToCallback: true },
      async (req, accessToken, done) => {
         try {
            const token = await AccessTokenService.fetchByToken(accessToken);
            if (!token) {
               return done(new AuthError(4001, 'Unauthorized: Invalid Access Token', 401), false);
            }

            // Check if the access token has expired and return false if expired
            if (Date.now() > new Date(token.dateExpired)) {
               return done(new AuthError(4002, 'Unauthorized: AccessToken expired.', 401), false);
            }

            const user = await UserService.fetchById(token.userId);
            if (!user) {
               return done(new AuthError(4003, 'Unauthorized: User does not exist'), false);
            }

            const client = await OauthClientService.findByClientId(token.clientId);

            if (!client) {
               return done(new AuthError(4004, 'Unauthorized: Not a valid auth source'));
            }

            const info = {
               scope: '*',
               authorities: client.authorities
            };

            return done(null, user, info);
         }
         catch (err) {
            return done(err);
         }

      }));
})();

module.exports = Auth;

'use strict';

const passport = require('passport');
const AuthError = require('./errors').AuthError;
const GoogleStragegy = require('passport-google-oauth20').Strategy;
const keys = require('../../config/keys');

const GoogleUserService = require('../services/GoogleUserService');

// allows us to take the user model and generate some unique information, that will
// be stuffed into a cookie
passport.serializeUser((user, done) => {
   done(null, user.id);
});

// Get a user model from what we just serialized
passport.deserializeUser(async (id, done) => {
   const user = await GoogleUserService.getGoogleUserByUserId(id); // might need to be findById(id) in dao layer
   done(null, user);
});

// go to console.developers.google.com
// add a new project
// click on Enable API and Services
// search for Google+ API and enable that
// click on credentials tab, then from dropdown, select Oauth Client Id
// add the consent name
// select web application
// add http://localhost:PORT to the bottom two fields
passport.use(new GoogleStragegy({
      clientID: keys.googleClientId,
      clientSecret: keys.googleClientSecret,
      callbackURL: '/auth/google/callback'
   }, async (accessToken, refreshToken, profile, done) => {
      const user = await GoogleUserService.getGoogleUserById(profile.id);
      if (!user) {
         const newUser = await GoogleUserService.createGoogleUser({googleId: profile.id});
         done(null, newUser);
      }
      done(null, user);
   })
);
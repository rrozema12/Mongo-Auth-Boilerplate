'use strict';

const passport = require('passport');
const AuthError = require('./errors').AuthError;
const GoogleStragegy = require('passport-google-oauth20').Strategy;
const keys = require('../../config/keys');

const UserService = require('../services/UserService');

// allows us to take the user model and generate some unique information, that will
// be stuffed into a cookie
passport.serializeUser((user, done) => {
   done(null, user.id);
});

// Get a user model from what we just serialized
passport.deserializeUser(async (id, done) => {
   const user = await UserService.findUserById(id); // might need to be findById(id) in dao layer
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
      const user = await UserService.findUserByGoogleId(profile.id);
      if (!user) {
         let data = {};
         data.googleId = profile.googleId;
         data.firstName = profile.name.givenName;
         data.lastName = profile.name.familyName;
         data.email = profile.emails[0].value;
         const newUser = await UserService.createUser(data);
         done(null, newUser);
      }
      done(null, user);
   })
);
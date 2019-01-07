'use strict';

const router = require('express-promise-router')();
const GenericError = require('../utils/errors').GenericError;
const passport = require('passport');
const authAccessToken = require('../utils/auth_tool').authAccessToken;

router.get('/google', passport.authenticate('google', {
   scope: ['email']
}));

router.get(
   '/google/callback',
   passport.authenticate('google'),
   (req, res) => {
      res.success("authenticated")
   }
);

module.exports = router;

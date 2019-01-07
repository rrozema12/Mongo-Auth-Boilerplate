'use strict';

const router = require('express-promise-router')();
const GenericError = require('../utils/errors').GenericError;
const passport = require('passport');

router.get('/google', passport.authenticate('google', {
   scope: ['email']
}));

router.get(
   '/google/callback',
   passport.authenticate('google'),
   (req, res) => {
      res.redirect("/dashboard")
   }
);

router.get('/google/logout', (req, res) => {
   req.logout();
   res.send(req.user);
});

router.get('/current_user', (req, res) => {
   res.send(req.user);
});

module.exports = router;

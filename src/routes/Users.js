'use strict';

const router = require('express-promise-router')();
const GenericError = require('../utils/errors').GenericError;
const passport = require('passport');
const authAccessToken = require('../utils/auth_tool').authAccessToken;

router.get('/me', (req, res) => {
   res.send(req.user);
});

router.get('/logout', (req, res) => {
   req.logout();
   res.send(req.user);
});

module.exports = router;

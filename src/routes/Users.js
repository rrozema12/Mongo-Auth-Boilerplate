'use strict';

const router = require('express-promise-router')();
const authAccessToken = require('../utils/auth_tool').authAccessToken;
const UsersService = require('../services/UserService');

router.get('/me', authAccessToken, async (req, res) => {
   let email = req.body.email;
   let user = await UsersService.findUserByEmail(email);
   res.send(user);
});

router.get('/logout', (req, res) => {
   res.status(200).send({ auth: false, token: null });
});

module.exports = router;

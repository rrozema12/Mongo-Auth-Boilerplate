'use strict';

const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');

const AuthTool = (() => {
   return {
      authAccessToken: (req, res, next) => {
         const token = req.headers['authorization'];
         if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });

         jwt.verify(token, keys.token, err => {
            if (err) return res.status(500).send({auth: false, message: 'Failed to authenticate token.'});

            next();
         });
      }
   }
})();

module.exports = AuthTool;

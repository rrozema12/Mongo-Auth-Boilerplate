'use strict';

const router = require('express-promise-router')();
const AuthService = require('../services/AuthService');

router.post('/register', async (req, res) => {
   let data = req.body;
   const response = await AuthService.createUser(data);
   res.send(response)

});

router.post('/login', async (req, res) => {
   try {
      let data = req.body;
      let user = await AuthService.authenticateUserByEmail(data);
      res.send(user)
   } catch(err) {
      return err;
   }
});

module.exports = router;

'use strict';

const router = require('express-promise-router')();
const UserService = require('../services/UserService');
const GenericError = require('../utils/errors').GenericError;

router.post('/', async (req, res) => {
  try {
    let data = req.body;
    if (!data.hasOwnProperty("username")) {
      throw new GenericError(1000, "No username provided in the body")
    }
    if (!data.hasOwnProperty("password")) {
      throw new GenericError(1001, "No password provided in the body")
    }
    if (!data.hasOwnProperty("email")) {
      throw new GenericError(1002, "No email provided in the body")
    }
    const response = UserService.createUser(data);
    return res.success(response);
  } catch (err) {
    return res.fail(err)
  }
});

router.get('/:email', async (req, res) => {
  try {
    if (!req.params.email) {
      throw new GenericError(1000, "No email provided in the url")
    }
    const email = req.params.email;
    const response = await UserService.getUserByEmail(email);
    return res.success(response);
  } catch (err) {
    return res.fail(err);
  }
});

module.exports = router;

'use strict';

const router = require('express-promise-router')();

/* GET users listing. */
router.get('/', (req, res, next) => {
  try {
    return res.success("users home");
  } catch (err) {
    return res.fail(err.message);
  }
});

module.exports = router;

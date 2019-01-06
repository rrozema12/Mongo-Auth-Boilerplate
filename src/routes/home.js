'use strict';

const router = require('express-promise-router')();

router.get('/', (req, res) => {
  return res.success("success");
});

module.exports = router;

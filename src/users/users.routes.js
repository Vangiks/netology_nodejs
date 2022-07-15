const express = require('express'),
  router = express.Router(),
  UsersController = require('./users.controller');

router.route('/login').post(UsersController.getUsers);

module.exports = router;

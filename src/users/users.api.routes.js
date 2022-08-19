const express = require('express'),
  router = express.Router(),
  UsersController = require('./users.api.controller');

const passport = require('passport');

router
  .route('/login')
  .post(passport.authenticate('local'), UsersController.login);
router.route('/me').get(UsersController.me);

router.route('/signup').post(UsersController.signup);

module.exports = router;

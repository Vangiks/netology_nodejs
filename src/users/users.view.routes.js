const express = require('express'),
  router = express.Router(),
  UsersController = require('./users.view.controller');

const passport = require('passport');

router.route('/').get(UsersController.me);

router.route('/me').get(UsersController.me);

router.route('/login').get(UsersController.login);
router
  .route('/login')
  .post(
    passport.authenticate('local', { failureRedirect: '/user/login' }),
    UsersController.signin
  );

router.route('/logout').get(UsersController.logout);

router.route('/signup').post(UsersController.signup);

module.exports = router;

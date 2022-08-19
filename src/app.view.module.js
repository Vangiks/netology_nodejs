const express = require('express'),
  router = express.Router(),
  booksModule = require('./books/books.view.module'),
  usersModule = require('./users/users.view.module');

router.use('/books', booksModule.routes);
router.use('/user', usersModule.routes);

module.exports = router;

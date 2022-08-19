const express = require('express'),
  router = express.Router(),
  booksModule = require('./books/books.api.module'),
  usersModule = require('./users/users.api.module');

router.use('/books', booksModule.routes);
router.use('/user', usersModule.routes);

module.exports = router;

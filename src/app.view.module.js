const express = require('express'),
  router = express.Router(),
  booksModule = require('./books/books.view.module');

router.use('/books', booksModule.routes);

module.exports = router;

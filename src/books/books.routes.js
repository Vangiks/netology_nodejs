const express = require('express'),
  router = express.Router(),
  BooksController = require('./books.controller');

router
  .route('/')
  .get(BooksController.getBooks)
  .post(BooksController.createBook);

router
  .route('/:id')
  .get(BooksController.getBooks)
  .put(BooksController.updateUser)
  .delete(BooksController.deleteBook);

module.exports = router;

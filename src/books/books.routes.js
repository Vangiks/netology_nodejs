const path = require('path');
const express = require('express'),
  router = express.Router(),
  BooksController = require('./books.controller');

const File = require('../../middleware/file');
const file = new File('book', 'public/books/upload');

router
  .route('/')
  .get(BooksController.getBooks)
  .post(file.upload().single('fileBook'))
  .post(BooksController.createBook);

router
  .route('/:id')
  .get(BooksController.getBooks)
  .put(BooksController.updateBook)
  .delete(BooksController.deleteBook);

router.route('/:id/download').get(BooksController.downloadBook);

module.exports = router;

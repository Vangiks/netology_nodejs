const path = require('path');
const express = require('express'),
  router = express.Router(),
  BooksController = require('./books.api.controller');

const File = require('../../middleware/file');
const file = new File('public/books/upload', null, { uniqueName: true });

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
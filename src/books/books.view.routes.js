const express = require('express'),
  router = express.Router(),
  BooksController = require('./books.view.controller');

const File = require('../../middleware/file');
const file = new File('public/books/upload', null, { uniqueName: true });

router
  .route('/create')
  .get(BooksController.create)
  .post(file.upload().single('fileBook'))
  .post(BooksController.createBook);

router.route('/').get(BooksController.getBooks);

router.route('/:id').get(BooksController.getBooks);

router
  .route('/:id/update')
  .get(BooksController.changeBooks)
  .post(file.upload().single('fileBook'))
  .post(BooksController.updateBook);

router.route('/:id/delete').post(BooksController.deleteBook);

router.route('/:id/download').get(BooksController.downloadBook);

module.exports = router;

const BooksController = require('./books.view.controller');
const BooksService = require('./books.service');
const BooksRoutes = require('./books.view.routes');

module.exports = {
  controllers: BooksController,
  providers: BooksService,
  routes: BooksRoutes,
};

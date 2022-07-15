const BooksController = require('./books.controller');
const BooksService = require('./books.service');
const BooksRoutes = require('./books.routes');

module.exports = {
  controllers: BooksController,
  providers: BooksService,
  routes: BooksRoutes,
};

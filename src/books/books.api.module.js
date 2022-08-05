const BooksController = require('./books.api.controller');
const BooksService = require('./books.service');
const BooksRoutes = require('./books.api.routes');

module.exports = {
  controllers: BooksController,
  providers: BooksService,
  routes: BooksRoutes,
};

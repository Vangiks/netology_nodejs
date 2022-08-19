const UsersController = require('./users.view.controller');
const UsersService = require('./users.service');
const UsersRoutes = require('./users.view.routes');

module.exports = {
  controllers: UsersController,
  providers: UsersService,
  routes: UsersRoutes,
};

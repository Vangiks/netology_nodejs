const UsersController = require('./users.api.controller');
const UsersService = require('./users.service');
const UsersRoutes = require('./users.api.routes');

module.exports = {
  controllers: UsersController,
  providers: UsersService,
  routes: UsersRoutes,
};

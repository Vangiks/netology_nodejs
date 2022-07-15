const UsersController = require('./users.controller');
const UsersService = require('./users.service');
const UsersRoutes = require('./users.routes');

module.exports = {
  controllers: UsersController,
  providers: UsersService,
  routes: UsersRoutes,
};

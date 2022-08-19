const UsersService = require('./users.service');

class UsersController {
  login(request, response) {
    if (request.user) {
      return response.status(200).send({
        response: 'OK',
        errors: [],
        status: true,
      });
    } else
      return response.status(401).send({
        response: 'No authorization',
        errors: ['No authorization'],
        status: false,
      });
  }

  async me(request, response) {
    const { user } = request;
    if (!request.isAuthenticated()) {
      return response.status(401).send({
        response: false,
        errors: ['No authorization'],
        status: false,
      });
    }
    return response.status(200).send({
      response: user,
      errors: [],
      status: true,
    });
  }

  async signup(request, response) {
    const user = request.body;

    const result = await UsersService.createUser(user);
    if (!result) {
      return response.status(500).send({
        response: false,
        errors: ['Not signup user'],
        status: false,
      });
    }
    return response.status(200).send({
      response: true,
      errors: [],
      status: true,
    });
  }
}

module.exports = new UsersController();

const UsersService = require('./users.service');

class UsersController {
  async getUsers(reques, response) {
    const books = await UsersService.getUsers();
    if (Array.isArray(books) && books?.length !== 0) {
      return response.status(201).send({
        response: books,
        errors: [],
        status: true,
      });
    } else
      return response
        .status(404)
        .send({ errors: ['Users not found'], response: null, status: false });
  }
}

module.exports = new UsersController();

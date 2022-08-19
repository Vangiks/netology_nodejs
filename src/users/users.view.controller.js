const UsersService = require('./users.service');

const title = 'Профиль';

class UsersController {
  login(request, response) {
    return response.render('user/login-register', { title });
  }

  signin(request, response) {
    const { user } = request;
    if (user) {
      return response.redirect('/user/me');
    } else return response.render('user/login-register', { title });
  }

  logout(request, response, next) {
    request.logout((err) => {
      if (err) {
        return next(err);
      }
      response.redirect('/user');
    });
  }

  async me(request, response) {
    const { user } = request;
    if (!request.isAuthenticated()) {
      return response.redirect('/user/login');
    }
    return response.render('user/me', { user, title });
  }

  async signup(request, response) {
    const user = request.body;

    await UsersService.createUser(user);
    return response.redirect('/user/login');
  }
}

module.exports = new UsersController();

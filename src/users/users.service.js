const Users = require('./model');

class UsersService {
  constructor() {
    this.databasePath = process.env.DATABASE_PATH;
    this.options = {
      usernameField: 'username',
      passwordField: 'password',
    };
  }

  static verifyPassword(user, password) {
    return user.password === password;
  }

  async verify(username, password, done) {
    const user = await Users.findOne({ username }).select('-__v');
    if (!user) {
      return done(null, false);
    }

    if (!UsersService.verifyPassword(user, password)) {
      return done(null, false);
    }

    return done(null, user);
  }

  async getUser(id) {
    try {
      const user = await Users.findById(id).select('-__v');
      return user;
    } catch (error) {
      console.log(error.message);
      return null;
    }
  }

  async createUser(user) {
    try {
      return await new Users({ ...user, emails: [user.email] }).save();
    } catch (error) {
      console.log(error.message);
      return null;
    }
  }
}

module.exports = new UsersService();

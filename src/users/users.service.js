const { readTable } = require('../../helpers/database');

class UsersService {
  constructor() {
    this.databasePath = process.env.DATABASE_PATH;
  }

  getUsers() {
    return readTable(this.databasePath, 'users');
  }
}

module.exports = new UsersService();

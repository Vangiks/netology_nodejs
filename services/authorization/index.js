const LocalStrategy = require('passport-local').Strategy;
const passport = require('passport');
const Users = require('../../src/users/users.service');

class Authorization {
  constructor(adapter) {
    this.adapter = adapter;
  }

  static authenticate() {
    return passport.authenticate();
  }

  use() {
    this.adapter.use('local', new LocalStrategy(Users.options, Users.verify));

    this.adapter.serializeUser((user, cb) => {
      cb(null, user.id);
    });

    this.adapter.deserializeUser(async (id, cb) => {
      const user = await Users.getUser(id);
      if (!user) {
        return cb(null);
      }
      cb(null, user);
    });
  }

  initialize() {
    return this.adapter.initialize();
  }

  session() {
    return this.adapter.session();
  }
}

module.exports = Authorization;

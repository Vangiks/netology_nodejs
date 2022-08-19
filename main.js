const config = require('./config');
const modulesView = require('./src/app.view.module');
const modulesApi = require('./src/app.api.module');
const error = require('./middleware/error');
const session = require('express-session');
const mongoose = require('mongoose');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const Users = require('./src/users/users.service');

passport.use('local', new LocalStrategy(Users.options, Users.verify));

passport.serializeUser((user, cb) => {
  cb(null, user.id);
});

passport.deserializeUser(async (id, cb) => {
  const user = await Users.getUser(id);
  if (!user) {
    return cb(null);
  }
  cb(null, user);
});

const express = require('express'),
  app = express();

const host = config.APP_BASE_PATH;
const port = config.PORT;
const databasePath = config.DATABASE_PATH;

console.log(config);

app.set('view engine', 'ejs');
app.set('views', __dirname + '/src/views');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({ secret: 'SECRET' }));

app.use(passport.initialize());
app.use(passport.session());

app.use('/api', modulesApi);
app.use('/', modulesView);

app.use(error);

async function main() {
  await mongoose.connect(databasePath);
}

main()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server listens http://${host}:${port}`);
    });
  })
  .catch((error) => console.log(error));

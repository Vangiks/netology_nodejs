const config = require('./config');
const modulesView = require('./src/app.view.module');
const modulesApi = require('./src/app.api.module');
const error = require('./middleware/error');
const mongoose = require('mongoose');

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

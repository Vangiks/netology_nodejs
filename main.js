const config = require('./config');
const modulesView = require('./src/app.view.module');
const modulesApi = require('./src/app.api.module');
const error = require('./middleware/error');

const express = require('express'),
  app = express();

const host = config.APP_BASE_PATH;
const port = config.PORT;

app.set('view engine', 'ejs');
app.set('views', __dirname + '/src/views');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', modulesApi);
app.use('/', modulesView);

app.use(error);

app.listen(port, () =>
  console.log(`Server listens http://${host}:${port}`)
);

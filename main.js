const config = require('./config');
const modules = require('./src/app.module');
const error = require('./middleware/error');

const express = require('express'),
  app = express();

const host = config.APP_BASE_PATH;
const port = config.PORT;

app.set('view engine', 'ejs');
app.set('views', __dirname + '/src/views');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', modules);

app.use(error);

app.listen(port, host, () =>
  console.log(`Server listens http://${host}:${port}`)
);

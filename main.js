const config = require('./config');
const modules = require('./src/app.module');

const express = require('express'),
  app = express();

const host = config.APP_BASE_PATH;
const port = config.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', modules);

app.listen(port, host, () =>
  console.log(`Server listens http://${host}:${port}`)
);

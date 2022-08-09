require('dotenv').config();

const config = {
  PORT: process.env.PORT || 3000,
  APP_BASE_PATH: process.env.APP_BASE_PATH || '127.0.0.1',
  DATABASE_PATH: process.env.DATABASE_PATH || 'database.json',
  APP_COUNTER_BOOKS_HOST: process.env.APP_COUNTER_BOOKS_HOST || 'http://localhost:3002',
};

module.exports = config;

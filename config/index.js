require('dotenv').config();

const config = {
  PORT: process.env.PORT || 3000,
  APP_BASE_PATH: process.env.APP_BASE_PATH || '127.0.0.1',
  DATABASE_PATH: process.env.DATABASE_PATH || 'database.json',
};

module.exports = config;

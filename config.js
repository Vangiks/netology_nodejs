require('dotenv').config();
console.log(process.env);

const config = {
  HOST_WEATHERSTACK: process.env.HOST_WEATHERSTACK,
  ACCESS_KEY_WEATHERSTACK: process.env.ACCESS_KEY_WEATHERSTACK,
};

module.exports = config;

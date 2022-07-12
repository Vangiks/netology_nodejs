#!/usr/bin/env node

const http = require('http');
const config = require('./config');

const { Command } = require('commander');
const program = new Command();

program
  .name('weatherstack')
  .description('CLI для получения данных погоды по API Weatherstack')
  .version('1.0.0');

program
  .command('get')
  .description('Получить данные погоды')
  .argument('<query>', 'Параметр запроса', () => {}, '')
  .option(
    '-m, --mode <string>',
    'Разные способы/моды (feature) получения погоды',
    'current'
  )
  .action(function (name, options) {
    const url = `${config.HOST_WEATHERSTACK}/${options.mode}?access_key=${config.ACCESS_KEY_WEATHERSTACK}&query=${this.args[0]}`;
    http
      .get(url, (response) => {
        const { statusCode } = response;

        if (statusCode !== 200) {
          console.log(
            `Ошибка при получении данных. Код ошибки = ${statusCode}`
          );
          return;
        }
        response.setEncoding('utf-8');

        let data = '';
        response.on('data', (chunk) => {
          data += chunk;
        });
        response.on('end', () => {
          console.log(JSON.parse(data));
        });
      })
      .on('error', (error) => {
        console.log('Error: ' + error.message);
      });
  });

program.parse();

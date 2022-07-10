#!/usr/bin/env node

const { getRandomIntInclusive, dialog } = require('./helpers');
const Logger = require('../../utils/logger');

class EagleAndTails {
  logger = null;
  countGame = 0;
  countWin = 0;
  countLose = 0;
  isLogging = false;

  constructor(logger = null) {
    this.logger = logger;
  }

  compare(answer) {
    let str = '';
    const value = Number(answer);
    if (value === this.valueFind) {
      str = 'ПОБЕДА!!!';
      this.countWin++;
    } else {
      str = 'Ничего, в следующий раз повезет!!!';
      this.countLose++;
    }
    if (this.isLogging) {
      this.log(this.generateStatistics(str));
    }
    return str;
  }

  generateValueFind() {
    this.valueFind = getRandomIntInclusive(1, 2);
  }

  generateStatistics(text) {
    const result = {
      result: text,
      countGame: this.countGame,
      countWin: this.countWin,
      countLose: this.countLose,
      procentWin: (this.countWin / this.countGame) * 100,
    };
    const log = `result=${result.result},countGame=${result.countGame},countWin=${result.countWin},countLose=${result.countLose},procentWin=${result.procentWin}\n`;
    return { result, log };
  }

  log(statistics) {
    if (this.logger) {
      this.logger.log(statistics.log);
    } else console.log(statistics.result);
  }

  start() {
    this.countGame++;
    this.generateValueFind();
    console.log(this.textStartGame());
    dialog('', this.compare.bind(this), this.start.bind(this));
  }

  textStartGame() {
    return `Игра №${this.countGame}. Отгадайте число: 1 или 2!`;
  }
}

require('yargs')
  .scriptName('Eagle and Tails')
  .usage('$0 <cmd> [args]')
  .command(
    'start [logging] [output]',
    'Начало игры',
    (yargs) => {
      yargs.positional('logging', {
        type: 'boolean',
        default: false,
        describe: 'Включить логирование результата игры',
        alias: ['--logging', '-l'],
      });
      yargs.positional('output', {
        type: 'string',
        default: '',
        describe: 'Имя файла для логирования. В формате "txt"',
        alias: ['--output', '-o'],
      });
    },
    function (yargs) {
      const eagleAndTails = new EagleAndTails();
      if (yargs?.logging) {
        eagleAndTails.isLogging = true;
        if (yargs?.output) {
          const logger = new Logger(yargs.output);
          eagleAndTails.logger = logger;
        }
      }
      eagleAndTails.start();
    }
  )
  .help().argv;

#!/usr/bin/env node

const { getIntervalValue, getRandomValueInt, dialog } = require('./helpers');

class GuessNumber {
  isFinish = false;
  valueFind = null;

  constructor(max, delta) {
    this.max = max;
    this.delta = delta;
  }

  compare(answer) {
    let str = '';
    const value = Number(answer);
    if (value < this.valueFind) {
      str = 'Больше';
    } else if (value > this.valueFind) {
      str = 'Меньше';
    } else if (value === this.valueFind) {
      str = `Отгадано число ${this.valueFind}`;
      this.isFinish = true;
    }
    return str;
  }

  generateValueFind() {
    this.valueFind = getRandomValueInt(this.max);
  }

  checkIsFinish() {
    return this.isFinish;
  }

  start() {
    this.generateValueFind();
    const interval = getIntervalValue(this.valueFind, this.delta);
    console.log(
      `Загадано число в диапазоне от ${interval.left} до ${interval.right}`
    );
    dialog('', this.compare.bind(this), this.checkIsFinish.bind(this));
  }
}

require('yargs')
  .scriptName('game')
  .usage('$0 <cmd> [args]')
  .command(
    'start',
    'Начало игры',
    () => {},
    function () {
      const QuessNumber = new GuessNumber(100, 20);
      QuessNumber.start();
    }
  )
  .help().argv;

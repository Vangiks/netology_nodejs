const readline = require('readline');
const { stdin: input, stdout: output } = require('process');

const rl = readline.createInterface({ input, output });

function getIntervalValue(value, delta) {
  return {
    left: value - getRandomInt(delta),
    right: value + getRandomInt(delta),
  };
}

function getRandomValueInt(max) {
  return getRandomSign() * getRandomInt(max);
}

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function getRandomSign() {
  return getRandomInt(2) === 0 ? -1 : 1;
}

function dialog(
  startQuestion,
  callbackDisplayNextQuestion,
  callbackCheckFinishDialog
) {
  rl.question(startQuestion, (answer) => {
    const question = callbackDisplayNextQuestion(answer);
    console.log(question);
    if (!callbackCheckFinishDialog()) {
      dialog('', callbackDisplayNextQuestion, callbackCheckFinishDialog);
    } else rl.close();
  });
}

module.exports = {
  getIntervalValue,
  getRandomValueInt,
  getRandomInt,
  getRandomSign,
  dialog,
  getRandomIntInclusive,
};

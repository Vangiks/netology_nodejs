const { dateNow, dateToISOString } = require('../../helpers/date');
const { getTime, operationTime } = require('../../helpers');

return require('yargs').command(
  'sub [year|month|date]',
  'Получать даты в прошлом',
  (yargs) => {
    yargs.positional('year', {
      type: 'number',
      default: 0,
      describe: 'Текущий год',
      alias: ['--year', '-y'],
    });
    yargs.positional('month', {
      type: 'number',
      default: 0,
      describe: 'Текущий месяц',
      alias: ['--month', '-m'],
    });
    yargs.positional('date', {
      type: 'number',
      default: 0,
      describe: 'Дата в календарном месяце',
      alias: ['--date', '-d'],
    });
  },
  function (yargs) {
    const time = getTime(yargs);
    value = operationTime(dateNow(), time.type, 'sub', time.value);
    console.log(dateToISOString(new Date(value)));
  }
);

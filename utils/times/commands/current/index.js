const { dateNow, dateToISOString } = require('../../helpers/date');

return require('yargs').command(
  'current [year|month|date]',
  'Текущая дата и время в формате ISO',
  (yargs) => {
    yargs.positional('year', {
      type: 'boolean',
      default: false,
      describe: 'Текущий год',
      alias: ['--year', '-y'],
    });
    yargs.positional('month', {
      type: 'boolean',
      default: false,
      describe: 'Текущий месяц',
      alias: ['--month', '-m'],
    });
    yargs.positional('date', {
      type: 'boolean',
      default: false,
      describe: 'Дата в календарном месяце',
      alias: ['--date', '-d'],
    });
  },
  function (yargs) {
    let value = dateToISOString(dateNow());
    if (yargs?.year) {
      value = dateNow().getFullYear();
    } else if (yargs?.month) {
      value = dateNow().getMonth() + 1;
    } else if (yargs?.date) {
      value = dateNow().getDate();
    }
    console.log(value);
  }
);

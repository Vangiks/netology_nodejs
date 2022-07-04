const { mapOperation: mapOperationYear } = require('./year');
const { mapOperation: mapOperationMonth } = require('./month');
const { mapOperation: mapOperationDate } = require('./date');

const mapType = {
  year: mapOperationYear,
  month: mapOperationMonth,
  date: mapOperationDate,
};

function operationTime(time, type, operation, value) {
  return mapType[type][operation](time, value);
}

function getTime(yargs) {
  let type = 'year';
  let value = 0;
  if (yargs?.year) {
    type = 'year';
    value = yargs.year;
  } else if (yargs?.month) {
    type = 'month';
    value = yargs.month;
  } else if (yargs?.date) {
    type = 'date';
    value = yargs.date;
  }
  return { type, value };
}

module.exports = { operationTime, getTime };

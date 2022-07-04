const mapOperation = {
  add: addDate,
  sub: subDate,
};

function dateNow() {
  return new Date();
}

function dateToISOString(date) {
  return date.toISOString();
}

function addDate(date, value) {
  return date.setDate(date.getDate() + value);
}

function subDate(date, value) {
  return date.setDate(date.getDate() - value);
}

module.exports = { dateNow, dateToISOString, mapOperation, addDate, subDate };

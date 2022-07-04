const mapOperation = {
  add: addYear,
  sub: subYear,
};

function addYear(year, value) {
  return year.setFullYear(year.getFullYear() + value);
}

function subYear(year, value) {
  return year.setFullYear(year.getFullYear() - value);
}

module.exports = { mapOperation, subYear, addYear };

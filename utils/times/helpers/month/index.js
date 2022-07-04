const mapOperation = {
  add: addMonth,
  sub: subMonth,
};

function addMonth(month, value) {
  return month.setMonth(month.getMonth() + value);
}

function subMonth(month, value) {
  return month.setMonth(month.getMonth() - value);
}

module.exports = { mapOperation, addMonth, subMonth };

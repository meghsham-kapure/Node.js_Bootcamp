function add() {
  return (value1, value2) => value1 + value2;
}

function subtract() {
  return (value1, value2) => value1 - value2;
}

function multiply() {
  return (value1, value2) => value1 * value2;
}

function power() {
  return (value1, value2) => value1 ** value2;
}

function divide() {
  return (value1, value2) => value1 / value2;
}

function modulo() {
  return (value1, value2) => value1 % value2;
}

module.exports = {
  add,
  subtract,
  multiply,
  power,
  divide,
  modulo,
};

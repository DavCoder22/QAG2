function calculateSum(a, b) {
  return a + b;
}

function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function isEven(number) {
  return number % 2 === 0;
}

module.exports = {
  calculateSum,
  validateEmail,
  isEven
};
const { calculateSum, validateEmail, isEven } = require('../src/index');

describe('calculateSum', () => {
  test('should return correct sum of two numbers', () => {
    expect(calculateSum(2, 3)).toBe(5);
  });

  test('should handle negative numbers', () => {
    expect(calculateSum(-1, 1)).toBe(0);
  });
});

describe('validateEmail', () => {
  test('should return true for valid email', () => {
    expect(validateEmail('test@example.com')).toBe(true);
  });

  test('should return false for invalid email', () => {
    expect(validateEmail('invalid-email')).toBe(false);
  });
});

describe('isEven', () => {
  test('should return true for even numbers', () => {
    expect(isEven(4)).toBe(true);
  });

  test('should return false for odd numbers', () => {
    expect(isEven(3)).toBe(false);
  });
});
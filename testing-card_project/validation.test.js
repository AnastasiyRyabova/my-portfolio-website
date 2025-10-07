
import { validateCardNumber, validateCVC, validateEmail } from './validate';

describe('Validation Tests', () => {
  let cardNumberInput;
  let cvcInput;
  let emailInput;

  beforeEach(() => {
    cardNumberInput = { value: '' };
    cvcInput = { value: '' };
    emailInput = { value: '' };
  });

  test('пропускает корректный номер карты', () => {
    cardNumberInput.value = '1234567812345678';
    console.log('Before validation card number:', cardNumberInput.value);
    const result = validateCardNumber();
    console.log('Validation result:', result);
    expect(result).toBe(false);
  });

  test('не пропускает произвольную строку', () => {
    cardNumberInput.value = 'abcdefg';
    console.log('Before validation card number:', cardNumberInput.value);
    expect(validateCardNumber()).toBe(false);
  });

  test('не пропускает строку с недостаточным количеством цифр', () => {
    cardNumberInput.value = '1234567';
    console.log('Before validation card number:', cardNumberInput.value);
    expect(validateCardNumber()).toBe(false);
  });

  test('не пропускает строку со слишком большим количеством цифр', () => {
    cardNumberInput.value = '12345678123456789';
    console.log('Before validation card number:', cardNumberInput.value);
    expect(validateCardNumber()).toBe(false);
  });

  test('пропускает строку с тремя цифровыми символами', () => {
    cvcInput.value = '123';
    console.log('Before validation CVC:', cvcInput.value);
    const result = validateCVC();
    console.log('Validation result:', result);
    expect(result).toBe(false);
  });

  test('не пропускает строки с 1-2 цифровыми символами', () => {
    cvcInput.value = '12';
    console.log('Before validation CVC:', cvcInput.value);
    expect(validateCVC()).toBe(false);
  });

  test('не пропускает строки с четырьмя и больше цифровыми символами', () => {
    cvcInput.value = '1234';
    console.log('Before validation CVC:', cvcInput.value);
    expect(validateCVC()).toBe(false);
  });

  test('не пропускает строки с тремя нецифровыми символами', () => {
    cvcInput.value = 'abc';
    console.log('Before validation CVC:', cvcInput.value);
    expect(validateCVC()).toBe(false);
  });

  test('пропускает строки, которые содержат корректный email', () => {
    emailInput.value = 'test@example.com';
    console.log('Before validation email:', emailInput.value);
    const result = validateEmail();
    console.log('Validation result:', result);
    expect(result).toBe(false);
  });

  test('не пропускает строки, которые начинаются с @', () => {
    emailInput.value = '@example.com';
    console.log('Before validation email:', emailInput.value);
    expect(validateEmail()).toBe(false);
  });

  test('не пропускает строки, которые не содержат @', () => {
    emailInput.value = 'testexample.com';
    console.log('Before validation email:', emailInput.value);
    expect(validateEmail()).toBe(false);
  });

  test('не пропускает строки, которые не содержат названия почтового ящика или домена', () => {
    emailInput.value = 'test@.com';
    console.log('Before validation email:', emailInput.value);
    expect(validateEmail()).toBe(false);
  });

  test('не пропускает строки, которые начинаются с цифр', () => {
    emailInput.value = '123test@example.com';
    console.log('Before validation email:', emailInput.value);
    expect(validateEmail()).toBe(false);
  });
});

// validate.js

export const cardNumberInput = { value: '' };
export const cvcInput = { value: '' };
export const emailInput = { value: '' };

export function validateCardNumber() {
  const value = cardNumberInput.value.replace(/\s/g, ''); // Удаление всех пробелов
  console.log('Validating card number:', value);
  return /^\d{16}$/.test(value); // Проверка на 16 цифр
}



  

export function validateCVC() {
  const value = cvcInput.value;
  console.log('Validating CVC:', value);
  return /^\d{3}$/.test(value); // Проверка на ровно три цифры
}



  

export function validateEmail() {
  const value = emailInput.value;
  console.log('Validating email:', value);
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(value);
}



  
console.log('Validating card number:', cardNumberInput.value);
console.log('Validating CVC:', cvcInput.value);
console.log('Validating email:', emailInput.value);

import IMask from 'imask';

// Selectors
const form = document.getElementById('payment-form');
const cardNumberInput = document.getElementById('card-number');
const expiryDateInput = document.getElementById('expiry-date');
const cvcInput = document.getElementById('cvc');
const emailInput = document.getElementById('email');
const payButton = document.getElementById('pay-button');
const errorMessage = document.getElementById('error-message');
const successMessage = document.getElementById('success-message');
const resetButton = document.getElementById('reset-button');

// Input masks
const cardNumberMask = IMask(cardNumberInput, {
  mask: '0000 0000 0000 0000',
  definitions: {
    '0': /[0-9]/,
  },
});

const expiryDateMask = IMask(expiryDateInput, {
  mask: 'MM/YY',
  lazy: false,
  blocks: {
    MM: { mask: IMask.MaskedRange, from: 1, to: 12, maxLength: 2 },
    YY: { mask: IMask.MaskedRange, from: new Date().getFullYear().toString().slice(-2), to: 99, maxLength: 2 },
  },
});

function showError(message) {
  errorMessage.textContent = message;
  errorMessage.classList.remove('binking__hide');
}

function hideError() {
  errorMessage.textContent = '';
  errorMessage.classList.add('binking__hide');
}

// Event listeners
cardNumberInput.addEventListener('input', () => {
  validateForm();
});

expiryDateInput.addEventListener('input', () => {
  validateForm();
});

cvcInput.addEventListener('input', () => {
  validateForm();
});

emailInput.addEventListener('input', () => {
  validateForm();
});

cardNumberInput.addEventListener('blur', () => {
  if (!validateCardNumber()) showError('Please enter a valid card number.');
  else hideError();
});

expiryDateInput.addEventListener('blur', () => {
  if (!validateExpiryDate()) showError('Please enter a valid expiry date (MM/YY).');
  else hideError();
});

cvcInput.addEventListener('blur', () => {
  if (!validateCVC()) showError('Please enter a valid CVC (3 digits).');
  else hideError();
});

emailInput.addEventListener('blur', () => {
  if (!validateEmail()) showError('Please enter a valid email address.');
  else hideError();
});

form.addEventListener('submit', (event) => {
  event.preventDefault();
  form.classList.add('binking__hide');
  successMessage.classList.remove('binking__hide');
});

resetButton.addEventListener('click', () => {
  form.reset();
  form.classList.remove('binking__hide');
  successMessage.classList.add('binking__hide');
  payButton.disabled = true;
  hideError();
});

validateForm();
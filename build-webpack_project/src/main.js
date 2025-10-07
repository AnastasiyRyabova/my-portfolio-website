import { h, mount } from 'redom';
import IMask from 'imask';
import './style.css';

const App = () => {
    const form = h('form', { id: 'payment-form', class: 'binking__form' }, [
        h('div', { class: 'binking__saved-cards' }, [
            h('div', { class: 'binking__cards' }, [
                h('div', { class: 'binking__card binking__card_new binking__selected' }, [
                    h('div', { class: 'binking__card-label' }, [
                        h('span', { class: 'binking__card-label-plus' }, '+'),
                        h('span', { class: 'binking__card-label-text' }, 'New card')
                    ])
                ])
            ])
        ]),
        h('div', { class: 'binking__new-card-form' }, [
            h('div', { class: 'binking__panels' }, [
                h('div', { class: 'binking__panel binking__front-panel' }, [
                    h('img', { class: 'binking__form-bank-logo binking__hide' }),
                    h('img', { class: 'binking__form-brand-logo binking__hide' }),
                    h('div', { class: 'binking__front-fields' }, [
                        h('input', { id: 'email', name: 'email', autocomplete: 'email', class: 'binking__field binking__email-field', type: 'email', placeholder: 'Email', required: true }),
                        h('input', { id: 'card-number', name: 'cardnumber', autocomplete: 'cc-number', inputmode: 'numeric', pattern: '[0-9 ]*', class: 'binking__field binking__number-field', type: 'text', placeholder: '0000 0000 0000 0000', required: true }),
                        h('label', { class: 'binking__label binking__date-label' }, 'Valid through'),
                        h('input', { id: 'expiry-date', name: 'ccmonth', autocomplete: 'cc-exp-month', inputmode: 'numeric', pattern: '[0-9]*', class: 'binking__field binking__month-field binking__date-field', type: 'text', placeholder: 'MM/YY', required: true }),
                        h('input', { id: 'cvc', name: 'cvc', autocomplete: 'cc-csc', inputmode: 'numeric', pattern: '[0-9]*', class: 'binking__field binking__code-field', type: 'password', placeholder: 'CVC', required: true })
                    ])
                ]),
                h('div', { class: 'binking__panel binking__back-panel' })
            ]),
            h('label', { class: 'binking__save-card' }, [
                h('input', { class: 'binking__save-card-checkbox', id: 'save-card', name: 'save', type: 'checkbox' }),
                h('span', 'Save your card for future payments')
            ])
        ]),
        h('div', { class: 'binking__form-bottom' }, [
            h('p', { id: 'error-message', class: 'binking__error binking__hide' }),
            h('button', { id: 'pay-button', class: 'binking__submit-button binking__button', type: 'submit', disabled: true }, 'Pay')
        ]),
        h('div', { class: 'binking__trust-logos' }, [
            h('img', { class: 'binking__trust-logo', src: 'https://static.binking.io/trust-logos/secure-connection.svg', alt: '' }),
            h('img', { class: 'binking__trust-logo', src: 'https://static.binking.io/trust-logos/mastercard.svg', alt: '' }),
            h('img', { class: 'binking__trust-logo', src: 'https://static.binking.io/trust-logos/mir.svg', alt: '' }),
            h('img', { class: 'binking__trust-logo', src: 'https://static.binking.io/trust-logos/visa.svg', alt: '' }),
            h('img', { class: 'binking__trust-logo', src: 'https://static.binking.io/trust-logos/pci-dss.svg', alt: '' })
        ])
    ]);

    return form;
};

mount(document.getElementById('app'), App());

function setupEventListeners() {
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

    // Validation functions
    function validateForm() {
        const isValid = validateCardNumber() && validateExpiryDate() && validateCVC() && validateEmail();
        payButton.disabled = !isValid; // Disable button if form is invalid
    }

    function validateCardNumber() {
        return cardNumberInput.value.length === 19;
    }

    function validateExpiryDate() {
        return expiryDateInput.value.length === 5;
    }

    function validateCVC() {
        return cvcInput.value.length === 3;
    }

    function validateEmail() {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailPattern.test(emailInput.value);
    }

    function showError(message) {
        errorMessage.textContent = message;
        errorMessage.classList.remove('binking__hide');
    }

    function hideError() {
        errorMessage.textContent = '';
        errorMessage.classList.add('binking__hide');
    }

    // Event listeners
    cardNumberInput.addEventListener('input', validateForm);
    expiryDateInput.addEventListener('input', validateForm);
    cvcInput.addEventListener('input', validateForm);
    emailInput.addEventListener('input', validateForm);

    cardNumberInput.addEventListener('blur', () => {
        if (!validateCardNumber()) showError('Пожалуйста, введите действительный номер карты.');
        else hideError();
    });

    expiryDateInput.addEventListener('blur', () => {
        if (!validateExpiryDate()) showError('Пожалуйста, введите действительную дату истечения (MM/YY).');
        else hideError();
    });

    cvcInput.addEventListener('blur', () => {
        if (!validateCVC()) showError('Пожалуйста, введите действительный CVC (3 цифры).');
        else hideError();
    });

    emailInput.addEventListener('blur', () => {
        if (!validateEmail()) showError('Пожалуйста, введите действительный адрес электронной почты.');
        else hideError();
    });

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        form.classList.add('binking__hide');
        successMessage.classList.remove('binking__hide');
    });

    validateForm();
}

setupEventListeners();


import { el, mount } from 'redom';
import iMask from 'imask';;
import cardValidator from 'card-validator';
import { validate as validateEmail } from 'email-validator';
import cardType from 'credit-card-type';

const INVALID_CLASS = 'is-invalid';

// создаём разметку
const cardNumInput = el('input.form-control', { type: 'text', name: 'number', placeholder: '0000 0000 0000 0000' });
const dateInput = el('input.form-control', { type: 'text', name: 'validUntil', placeholder: '00/00' });
const cvvInput = el('input.form-control', { type: 'password', name: 'cvv', placeholder: '***' });
const emailInput = el('input.form-control', { type: 'text', name: 'email', placeholder: 'example@mail.org' });
const btn = el('button.btn.btn-primary', 'Оплатить', { disabled: true });
// для удобства помещаем все поля в массив
const fields = [cardNumInput, dateInput, cvvInput, emailInput];
const form = el('form.card-form.container.rounded.bg-light', [...fields, btn]);

fields.forEach((input) => {
	// нужно для правильного расположения полей на форме, подробнее в main.css
	input.style.gridArea = input.name;
});

// маски помогают вводить значение в определённом формате
iMask(cardNumInput, { mask: '0000 0000 0000 0000' });
iMask(dateInput, { mask: '00/00' });
iMask(cvvInput, { mask: '0000' });

function validateForm() {
	// убираем невалидное состояние со всех полей, чтобы заново пройтись по ним валидаторами
	fields.forEach((input) => {
		input.classList.remove(INVALID_CLASS);
	});
	// включаем кнопку отправки
	btn.disabled = false;
	// сопоставляем поля ввода с их валидаторами, чтобы вместо дублирования кода проверки пройтись циклом
	const validators = [
		[cardNumInput, cardValidator.number],
		[dateInput, cardValidator.expirationDate],
		[cvvInput, cardValidator.cvv],
		[emailInput, (value) => ({ isValid: validateEmail(value) })],
	];

	validators.forEach(([input, validate]) => {
		// если значения нет, то не проводим валидацию, но делаем недоступной кнопку отправки
		if (!input.value) {
			btn.disabled = true;
			return;
		}
		// добавляем класс невалидности для некорректных значений
		if (!validate(input.value).isValid) {
			btn.disabled = true;
			input.classList.add(INVALID_CLASS);
		}
	});
}

function resetValidityState(event) {
	(event.target).classList.remove(INVALID_CLASS);
}

fields.forEach((input) => {
	// валидируем при выходе из фокуса
	input.addEventListener('blur', validateForm);
	// когда пользователь начал что-то вводить - убираем класс невалидности
	input.addEventListener('input', resetValidityState);
});

// ставим лого платёжной системы
cardNumInput.addEventListener('input', () => {
	// библиотека отдаст массив с возможными типами карт по частично введённому номеру карты...
	const potentialTypes = cardType(cardNumInput.value);
	// ...так что если там всего один элемент, то мы уверены, что карта именно этого типа, и только тогда выводим лого ПС
	cardNumInput.style.backgroundImage = potentialTypes.length === 1 ? `url("https://toplogos.ru/images/thumbs/preview-logo-${potentialTypes[0].type}.png")` : '';
});

form.addEventListener('submit', (event) => {
	event.preventDefault();
});

mount(window.document.getElementById('app'), el('.py-5', form));

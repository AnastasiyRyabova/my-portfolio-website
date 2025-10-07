class Card {
  constructor(container, cardNumber, flip) {
      this._cardNumber = cardNumber;
      this._open = false;
      this._success = false;
      this.element = this.createElement(container, flip);
  }

  createElement(container, flip) {
      const card = document.createElement('div');
      card.className = 'card';
      card.dataset.number = this.cardNumber;
      card.textContent = this.cardNumber;


      card.addEventListener('click', () => {
          flip(this);
      });

      container.appendChild(card);
      return card;
  }

  set cardNumber(value) {
      this._cardNumber = value;
      this.element.dataset.number = value;
  }

  get cardNumber() {
      return this._cardNumber;
  }

  set open(value) {
      this._open = value;
      if (value) {
          this.element.classList.add('open');
      } else {
          this.element.classList.remove('open');
      }
  }

  get open() {
      return this._open;
  }

  set success(value) {
      this._success = value;
      if (value) {
          this.element.classList.add('success');
          this.element.removeEventListener('click', this.flipCallback);
      }
  }

  get success() {
      return this._success;
  }
}

const cardsNumberArray = [1, 2, 3, 1, 2, 3];
const container = document.getElementById('game');

let firstCard = null;
let secondCard = null;

function handleCardClick(card) {
  if (card.success || card.open) return;
  card.open = true;

  if (!firstCard) {
      firstCard = card;
  } else {
      secondCard = card;

      if (firstCard.cardNumber === secondCard.cardNumber) {
          firstCard.success = true;
          secondCard.success = true;
          firstCard = null;
          secondCard = null;
      } else {

          setTimeout(() => {
            if (firstCard) firstCard.open = false;
            if (secondCard) secondCard.open = false;
              firstCard = null;
              secondCard = null;
          }, 1000);
      }
  }
}


for (const cardNumber of cardsNumberArray) {
  new Card(container, cardNumber, handleCardClick);
}

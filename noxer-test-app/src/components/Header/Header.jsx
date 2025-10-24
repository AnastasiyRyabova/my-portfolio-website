import React from 'react';
import './Header.css';
import close from '../../image/close.svg';
import telegramIcon from '../../image/icon_tg.svg';
import arrow from '../../image/arrow.svg';
import more from '../../image/more.svg';

export default function Header() {
  const handleClose = () => {
    console.log('Закрыть приложение');
  };

  return (
    <div className="header">
      <div className="header__content">
        <button onClick={handleClose} className="header__close-btn">
          <img src={close} alt="Иконка закрытия" />
          Закрыть
        </button>
        <a href="https://t.me/noxer_test_channel" target="_blank" rel="noopener noreferrer" className="header__tg-link">
          <img src={telegramIcon} alt="Иконка Telegram" />
          наш TG-канал
        </a>
        <button className="header__action-btn">
          <img src={arrow} alt="Показать больше" />
          <img src={more} alt="Открыть меню" />
        </button>
      </div>
    </div>
  );
}

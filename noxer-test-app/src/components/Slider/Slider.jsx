import React, { useState, useEffect } from 'react';
import './Slider.css';

import choose from '../../image/dotChoose.svg';
import notChoose from '../../image/dotNotChoose.svg';

export default function Slider() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const slides = [
    { id: 1, title: 'Всем клиентам дарим 500 руб.', content: 'на первый заказ в теленрам-боте.', link: '#' },
    { id: 2, title: 'При регистрации дарим 300 бонусов', content: 'для новых клиентов', link: '#' },
    { id: 3, title: 'За рекомендацию магазина -15%', content: 'не суммируются со скадками', link: '#' },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <div className="slider">
      <div className="slider__container">
        <div className="slider__slide">
          <h3>{slides[currentIndex].title}</h3>
          <p>{slides[currentIndex].content}</p>
          <a href={slides[currentIndex].link}>Подробнее</a>
        </div>
      </div>
      <div className="slider__dots">
        {slides.map((_, index) => (
          <img
            key={index}
            src={index === currentIndex ? choose : notChoose}
            alt={`Dot ${index + 1}`}
            className={`slider__dot ${index === currentIndex ? 'slider__dot--active' : ''}`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </div>
  );
}

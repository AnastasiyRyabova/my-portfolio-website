import React from 'react';
import categoriesData from '../../data/categoriesData.js';
import './Categories.css';

const Categories = () => {
  const handleCategoryClick = (category) => {
    console.log(`Выбрана категория: ${category.name}`);
  };

  return (
    <div className="categories__container">
      <ul className="categories__list">
        {categoriesData.map((category) => (
          <li key={category.id} className="category__item">
            <button 
              className="category__button" 
              onClick={() => handleCategoryClick(category)}
            >
                <img 
          src={category.image} 
          alt={category.name} 
          />
              {category.name}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Categories;

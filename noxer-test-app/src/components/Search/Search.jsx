import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Search.css';

import search from '../../image/search.svg';


const popularSearches = [
  "футболка женская",
  "кофта",
  "сертификат",
  "куртка детская",
  "футболка",
  "подарочный сертификат",
  "штаны спортивные"
];

export default function Search({ initialQuery = '' }) {
  const [query, setQuery] = useState(initialQuery);
  const [isFocused, setIsFocused] = useState(false);
  const navigate = useNavigate();
  const inputRef = useRef(null);

  useEffect(() => {
    setQuery(initialQuery);
  }, [initialQuery]);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    navigate(`/search?q=${encodeURIComponent(value)}`);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };


  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setTimeout(() => setIsFocused(false), 150);
  };

  const handlePopularSearchClick = (search) => {
    setQuery(search);
    setIsFocused(false);
  };

  const handleCloseDropdown = () => {
    setIsFocused(false);
  };

  return (
    <div className="search">
      <div className="search__container">
        <img src={search} alt="Поиск" className="search__icon" />
        <input
          ref={inputRef}
          type="text"
          className="search__input"
          placeholder="Найти товары"
          value={query}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          onFocus={handleFocus}
          onBlur={handleBlur}
          
        />
      </div>
      {isFocused && query.trim() === '' && (
        <div className="search__dropdown-overlay" onClick={handleCloseDropdown}>
          <div className="search__dropdown" onClick={(e) => e.stopPropagation()}>
            <h3 className="search__dropdown-title">Часто ищут</h3>
            <ul className="search__dropdown-list">
              {popularSearches.map((search, index) => (
                <li key={index} className="search__dropdown-item">
                  <Link
                    to={`/search?q=${encodeURIComponent(search)}`}
                    onClick={() => handlePopularSearchClick(search)}
                    className="search__dropdown-link"
                  >
                    {search}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { type Movie } from '../../api/movies';
import './Dropdown.css';
import { getRatingClass } from '../../utils/ratingUtils';

interface DropdownProps {
  items: Movie[] | undefined;
  onSelect: (item: Movie) => void;
  isLoading?: boolean;
}

const Dropdown: React.FC<DropdownProps> = ({ items, onSelect, isLoading = false }) => {
  const navigate = useNavigate();

  const handleSelect = (item: Movie) => {
    onSelect(item);
    navigate(`/movie/${item.id}`);
  };

  const formatRuntime = (minutes: number): string => {
    if (!minutes) return '';
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}ч ${mins}мин`;
  };

  if (isLoading) {
    return (
      <ul className='dropdown-list'>
        <li className='dropdown-list__loading'>
          <p>Поиск фильмов...</p>
        </li>
      </ul>
    );
  }
  if (!items || items.length === 0) {
    return (
      <ul className='dropdown-list__empty'>
        <li className='dropdown-list__empty'>
          <p>Фильмы не найдены</p>
        </li>
      </ul>
    );
  }

  return (
    <ul className='dropdown-list'>
      {items.map((item) => {
        if (!item) return null;
        
        return (
          <li
            key={item.id}
            onMouseDown={() => handleSelect(item)} 
            className='dropdown-list__item'
          >
            {item.posterUrl && (
              <img 
                className='dropdown-list__img' 
                src={item.posterUrl} 
                alt={item.title || 'Фильм'} 
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
            )}
            <div className='dropdown-list__info info'>
              <div className='info__list'>
                {item.tmdbRating && item.tmdbRating > 0 && (
                  <div className={`info__rating ${getRatingClass(item.tmdbRating)}`}>
                    <span>⭐</span>
                    <p>{item.tmdbRating.toFixed(1)}</p>
                  </div>
                )}
                {item.releaseYear && <p>{item.releaseYear}</p>}
                {item.genres && item.genres.length > 0 && (
                  <p>{item.genres.slice(0, 2).join(', ')}</p>
                )}
                {item.runtime && item.runtime > 0 && (
                  <p>{formatRuntime(item.runtime)}</p>
                )}
              </div>
              <strong className='dropdown-list__title'>
                {item.title || 'Без названия'}
              </strong>
              {item.originalTitle && item.originalTitle !== item.title && (
                <p className='dropdown-list__original'>{item.originalTitle}</p>
              )}
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export default Dropdown;

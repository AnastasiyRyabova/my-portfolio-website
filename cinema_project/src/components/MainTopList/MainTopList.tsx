import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './MainTopList.css';
import { getTop10Movies } from '../../api/movies';
import type { Movie } from '../../api/movies';

export default function MainTopList() {
  const navigate = useNavigate();
  const [topMovies, setTopMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTop10Movies = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await getTop10Movies();
        
        if (!response || !Array.isArray(response.movies)) {
          throw new Error('API вернул некорректные данные (нет массива фильмов)');
        }
        
        setTopMovies(response.movies);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Не удалось загрузить топ фильмов');
        console.error('Error fetching top movies:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchTop10Movies();
  }, []);

  const handleCardClick = (id: number) => {
    navigate(`/movie/${id}`);
  };

  if (loading) {
    return <div className="main-top-list-loading">Загрузка топ фильмов...</div>;
  }

  if (error) {
    return (
      <div className="main-top-list-error">
        <div>Ошибка: {error}</div>
        <button onClick={() => window.location.reload()} className="retry-button">
          Попробовать снова
        </button>
      </div>
    );
  }

  return (
    <>
      <h2 className='main-top-list__title'>Топ 10 фильмов</h2>
      <div className='main-top-list__cards'>
        {topMovies.map((movie: Movie, index: number) => (
          <div 
            className='main-top-list__item' 
            key={movie.id} 
            onClick={() => handleCardClick(movie.id)}
          >
            <p className='main-top-list__number'>{index + 1}</p>
            <img
              className='main-top-list__image'
              src={movie.posterUrl}
              alt={`Постер фильма ${movie.title}`}
              onError={(e) => {
                e.currentTarget.src = '../../image/top-item-8.png';
              }}
            />
          </div>
        ))}
      </div>
    </>
  );
}

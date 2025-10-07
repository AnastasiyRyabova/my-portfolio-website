import { useState, useEffect, useCallback } from 'react';
import like from '../../image/like.png';
import change from '../../image/change.png';
import './MainPreview.css';
import MovieModal from '../MovieModal/MovieModal';
import { movieApi } from '../../api/movies';
import { addToFavorites, removeFromFavorites } from '../../api/movies';
import type { Movie } from '../../api/movies';
import type { User } from '../../api/api';
import { getRatingClass } from '../../utils/ratingUtils';

interface MainPreviewProps {
  user: User | null;
  setUser: (user: User | null) => void;
}

export default function MainPreview({ user, setUser }: MainPreviewProps) {
  const [randomCard, setRandomCard] = useState<Movie | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isLiked, setIsLiked] = useState(false);

  const fetchRandomCard = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const movieData = await movieApi.getRandomMovie();
      setRandomCard(movieData);
      checkIfLiked(movieData.id);
      
    } catch (error) {
      console.error('Ошибка при получении случайного фильма:', error);
      setError(error instanceof Error ? error.message : 'Неизвестная ошибка');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRandomCard();
  }, []);

  const checkIfLiked = useCallback((movieId: number) => {
    if (!user || !Array.isArray(user.favorites)) {
      setIsLiked(false);
      return;
    }
    setIsLiked(user.favorites.includes(movieId.toString()));
  }, [user]);

  useEffect(() => {
    if (randomCard) {
      checkIfLiked(randomCard.id);
    }
  }, [user?.favorites, randomCard, checkIfLiked]);

  const handleLike = async () => {
    if (!randomCard || !user) {
      alert('Пользователь не авторизован');
      return;
    }

    const movieIdStr = randomCard.id.toString();
    const isCurrentlyLiked = Array.isArray(user.favorites) && user.favorites.includes(movieIdStr);
    
    try {
      if (isCurrentlyLiked) {
        await removeFromFavorites(movieIdStr);
        setUser({
          ...user,
          favorites: user.favorites.filter(id => id !== movieIdStr)
        });
      } else {
        await addToFavorites(movieIdStr);
        setUser({
          ...user,
          favorites: Array.isArray(user.favorites) ? [...user.favorites, movieIdStr] : [movieIdStr]
        });
      }
      setIsLiked(!isCurrentlyLiked);
    } catch (err) {
      console.error('Ошибка изменения избранного:', err);
      alert('Не удалось изменить избранное: ' + (err instanceof Error ? err.message : 'Неизвестная ошибка'));
    }
  };

  const handleChangeClick = () => {
    fetchRandomCard();
  };

  const handleTrailerClick = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  if (loading) {
    return <div className="main-preview-loading">Загрузка случайного фильма...</div>;
  }

  if (error && !randomCard) {
    return (
      <div className="main-preview-error">
        <div>Ошибка: {error}</div>
        <button onClick={fetchRandomCard} className="retry-button">
          Попробовать снова
        </button>
      </div>
    );
  }

  return (
    <div className='main-preview'>
      <div className='main-preview__card'>
        <div className='main-preview__inform'>
          <div className={`main-preview__rating ${getRatingClass(randomCard?.tmdbRating)}`}>
            <span className='main-preview__rating-star'>⭐</span>
            <p>{randomCard?.tmdbRating}</p>
          </div>
          <ul className='main-preview__inform-list'>
            <li>{randomCard?.releaseYear}</li>
            <li>{randomCard?.genres.join(', ')}</li>
            <li>{randomCard ? `${Math.floor(randomCard.runtime / 60)}ч ${randomCard.runtime % 60}м` : ''}</li>
          </ul>
        </div>
        <h3 className='main-preview__title'>{randomCard?.title}</h3>
        <p className='main-preview__descr'>{randomCard?.plot}</p>
        <div className='main-preview__choose choose'>
          <button className='choose__trailer' onClick={handleTrailerClick}>
            Трейлер
          </button>
          <a className='choose__inform' href={`/movie/${randomCard?.id}`}>
            О фильме
          </a>
          <button className={`choose__like ${isLiked ? 'liked' : ''}`} onClick={handleLike}>
            <img src={like} alt="Добавить в избранное" />
          </button>
          <button className='choose__change' onClick={handleChangeClick}>
            <img src={change} alt="Сменить фильм" />
          </button>
        </div>
      </div>
      <div className='main-preview__image'>
        <img
          className='main-preview__img'
          src={randomCard?.posterUrl}
          alt={`Фильм ${randomCard?.title}`}
          onError={(e) => {
            e.currentTarget.src = 'https://via.placeholder.com/300x450';
          }}
        />
      </div>

      <MovieModal
        isOpen={isModalOpen} 
        onClose={closeModal} 
        trailerUrl={randomCard?.trailerUrl || ''} 
      />
    </div>
  );
}

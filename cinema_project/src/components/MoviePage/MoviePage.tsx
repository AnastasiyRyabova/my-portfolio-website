import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import like from '../../image/like.png';
import './MoviePage.css';
import MovieModal from '../MovieModal/MovieModal';
import { getMovieById, addToFavorites, removeFromFavorites } from '../../api/movies';
import { formatDuration, formatRating } from '../../utils/format';
import type { Movie } from '../../api/movies';
import type { User } from '../../api/api';
import { getLanguageName } from '../../utils/languageUtils';
import { getRatingClass } from '../../utils/ratingUtils';

interface MoviePageProps {
  user: User | null;
  setUser: (user: User | null) => void;
}

const MoviePage: React.FC<MoviePageProps> = ({ user, setUser }) => {
  const { id } = useParams<{ id: string }>();
  const [movie, setMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    const fetchMovie = async () => {
      if (!id) {
        setError('ID фильма не указан');
        setLoading(false);
        return;
      }
      
      try {
        const movieData = await getMovieById(id);
        setMovie(movieData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Не удалось загрузить фильм');
      } finally {
        setLoading(false);
      }
    };

    fetchMovie();
  }, [id]);

  useEffect(() => {
    if (movie && user) {
      setIsLiked(user.favorites.includes(movie.id.toString()));
    } else {
      setIsLiked(false);
    }
  }, [user?.favorites, movie]);

  const handleLike = async () => {
    if (!movie || !user) {
      alert('Пользователь не авторизован');
      return;
    }

    const movieIdStr = movie.id.toString();
    const isCurrentlyLiked = user.favorites.includes(movieIdStr);

    try {
      if (isCurrentlyLiked) {
        await removeFromFavorites(movieIdStr);
        setUser({ ...user, favorites: user.favorites.filter(id => id !== movieIdStr) });
      } else {
        await addToFavorites(movieIdStr);
        setUser({ ...user, favorites: [...user.favorites, movieIdStr] });
      }
    } catch (err) {
      alert('Не удалось обновить избранное: ' + (err instanceof Error ? err.message : 'Неизвестная ошибка'));
    }
  };

  const toggleModal = () => setIsModalOpen(!isModalOpen);

  const renderAboutList = () => {
    const items = [
      { label: 'Язык оригинала:', value: movie?.language ? getLanguageName(movie.language) : null },
      { label: 'Бюджет:', value: movie?.budget, suffix: ' $' },
      { label: 'Выручка:', value: movie?.revenue, suffix: ' $' },
      { label: 'Режиссёр:', value: movie?.director },
      { label: 'Продакшен:', value: movie?.production },
      { label: 'Награды:', value: movie?.awardsSummary },
    ].filter(item => item.value);

    return items.map((item, index) => (
      <li key={index}>
        {item.label}
        <span className='movie-page__about-separator'></span>
        <span className='movie-page__about-span'>{item.value}{item.suffix || ''}</span>
      </li>
    ));
  };

  if (loading) return <div className="movie-page-loading">Загрузка фильма...</div>;

  if (error) {
    return (
      <div className="movie-page-error">
        <div>Ошибка: {error}</div>
        <button onClick={() => window.location.reload()} className="retry-button">Попробовать снова</button>
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="movie-page-not-found">
        <div>Фильм не найден</div>
        <p>ID: {id}</p>
      </div>
    );
  }

  return (
    <>
      <div className='movie-page'>
        <div className='movie-page__card'>
          <div className='movie-page__inform'>
            <div className={`movie-page__rating ${getRatingClass(movie.tmdbRating)}`}>
              <span className='movie-page__rating-star'>⭐</span>
              <p>{formatRating(movie.tmdbRating)}</p>
            </div>
            <ul className='movie-page__inform-list'>
              <li>{movie.releaseYear}</li>
              <li>{movie.genres.join(', ')}</li>
              <li>{formatDuration(movie.runtime)}</li>
            </ul>
          </div>
          <h3 className='movie-page__title'>{movie.title}</h3>
          <p className='movie-page__descr'>{movie.plot}</p>
          <div className='movie-page__choose choose'>
            <button className='choose__trailer' onClick={toggleModal}>Трейлер</button>
            <button className={`choose__like ${isLiked ? 'liked' : ''}`} onClick={handleLike}>
              <img src={like} alt="Добавить в избранное" />
            </button>
          </div>
        </div>
        <div className='movie-page__image'>
          <img
            className='movie-page__img'
            src={movie.posterUrl}
            alt={`Постер фильма ${movie.title}`}
            onError={(e) => (e.currentTarget.src = '/fallback-poster.jpg')}
          />
        </div>
      </div>
      
      <div className='movie-page__about'>
        <h3 className='movie-page__about-title'>О фильме</h3>
        <ul className='movie-page__about-list'>{renderAboutList()}</ul>
      </div>
      
      <MovieModal isOpen={isModalOpen} onClose={toggleModal} trailerUrl={movie.trailerUrl} />
    </>
  );
};

export default MoviePage;

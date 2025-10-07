import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './FavoriteMovies.css';
import { getMovieById, removeFromFavorites } from '../../api/movies';
import type { Movie } from '../../api/movies';
import type { User } from '../../api/api';
import { user as apiUser } from '../../api/api';
import close from '../../image/closebutton.png'

interface FavoriteMoviesProps {
  user: User | null;
  setUser: (user: User | null) => void;
}

const FavoriteMovies: React.FC<FavoriteMoviesProps> = ({ user, setUser }) => {
  const navigate = useNavigate();
  const [favorites, setFavorites] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const normalizedFavorites = user?.favorites?.map(String) ?? [];

  useEffect(() => {
    const fetchFavorites = async () => {
      if (!user || normalizedFavorites.length === 0) {
        setFavorites([]);
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const moviePromises = normalizedFavorites.map(id =>
          getMovieById(id).catch(err => {
            console.error(`Ошибка загрузки фильма ${id}:`, err);
            return null;
          })
        );

        const moviesResults = await Promise.all(moviePromises);
        const loadedMovies = moviesResults.filter((m): m is Movie => m !== null);
        setFavorites(loadedMovies);
      } catch (err) {
        setError('Не удалось загрузить избранные фильмы');
        console.error('Ошибка загрузки избранных:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, [user?.favorites?.join(',')]);

  const handleRemove = async (movieId: number | string) => {
    if (!user) return;

    const movieIdStr = movieId.toString();

    try {
      await removeFromFavorites(movieIdStr);
      const updatedUser = await apiUser.profile();
      setUser(updatedUser);

      if (updatedUser?.favorites) {
        const updatedNormalized = updatedUser.favorites.map(String);
        setFavorites(prev => prev.filter(m => updatedNormalized.includes(m.id.toString())));
      } else {
        setFavorites([]);
      }
    } catch (err) {
      console.error('Ошибка удаления из избранного:', err);
      alert('Не удалось удалить из избранного: ' + (err instanceof Error ? err.message : 'Неизвестная ошибка'));
    }
  };

  if (!user) {
    return <div>Пользователь не авторизован</div>;
  }

  if (loading) {
    return <div className="favorites-loading">Загрузка избранных фильмов...</div>;
  }

  if (error) {
    return <div className="favorites-error">Ошибка: {error}</div>;
  }

  if (favorites.length === 0) {
    return <div className="favorites-empty">У вас нет избранных фильмов</div>;
  }

  return (
    <div className="favorites">
      <div className="favorites-list">
        {favorites.map(movie => (
          <div 
            key={movie.id} 
            className="favorite-item" 
            onClick={() => navigate(`/movie/${movie.id}`)}
          >
            <div className="favorite-image-container">
              <img 
                className='favorite-img'
                src={movie.posterUrl || '/default-poster.jpg'}
                alt={movie.title} 
                onError={(e) => { e.currentTarget.src = '/default-poster.jpg'; }}
              />
            </div>
            <button 
              onClick={(e) => { e.stopPropagation(); handleRemove(movie.id); }}
            >
              <img className='button-close' src={close} alt='close'></img>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FavoriteMovies;

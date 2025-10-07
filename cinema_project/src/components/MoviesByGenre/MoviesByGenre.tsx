import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import back from '../../image/back.png';
import './MoviesByGenre.css';

interface Movie {
  id: number;
  title: string;
  releaseYear: number;
  genres: string[];
  posterUrl: string;
  tmdbRating?: number;
}

const MoviesByGenre = () => {
  const { genre } = useParams<{ genre: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  

  const genreName = location.state?.genreName || genre;

  const [movies, setMovies] = useState<Movie[]>([]);
  const [filteredMovies, setFilteredMovies] = useState<Movie[]>([]);
  const [visibleCount, setVisibleCount] = useState(10);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch('https://cinemaguide.skillbox.cc/movie', {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
          }
        });

        if (!response.ok) {
          throw new Error(`Ошибка HTTP: ${response.status}`);
        }

        const data = await response.json();
        setMovies(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Не удалось загрузить фильмы');
        console.error('Ошибка загрузки фильмов:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  useEffect(() => {
    if (genre && movies.length > 0) {
      const targetGenre = genre.toLowerCase();
      const filtered = movies.filter(movie => 
        movie.genres && 
        movie.genres.some(movieGenre => 
          movieGenre.toLowerCase() === targetGenre
        )
      );
      setFilteredMovies(filtered);
    }
  }, [genre, movies]);

  const loadMoreMovies = () => {
    setVisibleCount(prevCount => prevCount + 10);
  };

  const handleMovieClick = (id: number) => {
    navigate(`/movie/${id}`);
  };

  const handleBackClick = () => {
    navigate(-1);
  };

  if (loading) {
    return (
      <div className="movies-by-genre">
        <div className="movies-by-genre__header">
          <button onClick={handleBackClick} className="movies-by-genre__back-button">
            <img src={back} alt="Назад" />
          </button>
          <h2 className="movies-by-genre__title">{genreName}</h2>
        </div>
        <div className="movies-by-genre__loading">Загрузка фильмов...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="movies-by-genre">
        <div className="movies-by-genre__header">
          <button onClick={handleBackClick} className="movies-by-genre__back-button">
            <img src={back} alt="Назад" />
          </button>
          <h2 className="movies-by-genre__title">{genreName}</h2>
        </div>
        <div className="movies-by-genre__error">
          <p>Ошибка: {error}</p>
          <button onClick={() => window.location.reload()} className="movies-by-genre__retry-button">
            Попробовать снова
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="movies-by-genre">
      <div className="movies-by-genre__header">
        <button onClick={handleBackClick} className="movies-by-genre__back-button">
          <img src={back} alt="Назад" />
        </button>
        <h2 className="movies-by-genre__title">{genreName}</h2>
      </div>
      
      {filteredMovies.length > 0 ? (
        <>
          <div className="movies-by-genre__list">
            {filteredMovies.slice(0, visibleCount).map((movie) => (
              <div 
                key={movie.id} 
                className="movies-by-genre__card" 
                onClick={() => handleMovieClick(movie.id)}
              >
                <img src={movie.posterUrl} alt={movie.title} />
              </div>
            ))}
          </div>
          
          {visibleCount < filteredMovies.length && (
            <div className="movies-by-genre__button-container"> 
              <button onClick={loadMoreMovies} className="movies-by-genre__load-more-button">
                Показать еще
              </button>
            </div>
          )}
        </>
      ) : (
        <div className="movies-by-genre__empty">
          <p>Нет фильмов в жанре "{genreName}"</p>
        </div>
      )}
    </div>
  );
};

export default MoviesByGenre;

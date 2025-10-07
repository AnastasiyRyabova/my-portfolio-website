import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Genres.css';
import { getGenres } from '../../api/movies';
import { genreMapping } from '../../data/genreMapping';
import dramaImage from '../../image/drama-image.jpg';

interface Genre {
  id: number;
  genre: string;
  englishGenre: string;
  img: string;
}

export default function Genres() {
  const navigate = useNavigate();
  const [genres, setGenres] = useState<Genre[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const englishGenres = await getGenres();
        
        const formattedGenres: Genre[] = englishGenres.map((englishGenre, index) => {
          const mapping = genreMapping[englishGenre.toLowerCase()] || { 
            russian: englishGenre, 
            img: dramaImage
          };
          
          return {
            id: index + 1,
            genre: mapping.russian,
            englishGenre: englishGenre,
            img: mapping.img
          };
        });

        setGenres(formattedGenres);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Не удалось загрузить жанры');
      } finally {
        setLoading(false);
      }
    };

    fetchGenres();
  }, []);

  const handleGenreClick = (englishGenre: string, russianGenre: string) => {
    navigate(`/movies/${encodeURIComponent(englishGenre)}`, { 
      state: { genreName: russianGenre } 
    });
  };

  const handleKeyPress = (e: React.KeyboardEvent, englishGenre: string, russianGenre: string) => {
    if (e.key === 'Enter' || e.key === ' ') {
      handleGenreClick(englishGenre, russianGenre);
    }
  };

  if (loading) {
    return (
      <div className="genres">
        <h2 className="genres__title">Жанры фильмов</h2>
        <div className="genres-loading">Загрузка жанров...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="genres">
        <h2 className="genres__title">Жанры фильмов</h2>
        <div className="genres-error">
          <div>Ошибка: {error}</div>
          <button onClick={() => window.location.reload()} className="retry-button">
            Попробовать снова
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="genres">
      <h2 className="genres__title">Жанры фильмов</h2>
      <div className="genres__list">
        {genres.map((item) => (
          <div
            className="genres__card"
            key={item.id}
            style={{ backgroundImage: `url(${item.img})` }}
            onClick={() => handleGenreClick(item.englishGenre, item.genre)}
            role="button"
            tabIndex={0}
            onKeyPress={(e) => handleKeyPress(e, item.englishGenre, item.genre)}
          >
            <div className="genres__overlay">
              <h3 className="genres__overlay-title">{item.genre}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

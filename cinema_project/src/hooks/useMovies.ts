import { useState, useEffect } from 'react';
import { user, favorites, movie as movieApi } from '../api/api';
import type { User } from '../api/api';
import type { Movie } from '../api/movies';

export function useMovies(params?: {
  page?: number;
  limit?: number;
  genre?: string;
  year?: number;
  rating?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  search?: string;
}) {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    let isMounted = true;
    
    const fetchMovies = async () => {
      try {
        setLoading(true);
        setError(null);
        const movieResponse = await movieApi.getMovies(params);
        
        if (isMounted) {
          setMovies(movieResponse.movies);
          setTotal(movieResponse.total);
        }
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err.message : 'Unknown error');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchMovies();

    return () => {
      isMounted = false;
    };
  }, [params]);

  return { movies, loading, error, total };
}

export function useMovie(id: string) {
  const [movieData, setMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const fetchMovie = async () => {
      try {
        setLoading(true);
        setError(null);
        const movie = await movieApi.getMovieById(id);
        
        if (isMounted) {
          setMovie(movie);
        }
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err.message : 'Unknown error');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    if (id) {
      fetchMovie();
    } else {
      if (isMounted) {
        setLoading(false);
        setMovie(null);
      }
    }

    return () => {
      isMounted = false;
    };
  }, [id]);

  return { movie: movieData, loading, error };
}

export function useUser() {
  const [userData, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const fetchUser = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await user.profile();
        
        if (isMounted) {
          setUser(response || null);
          setIsAuth(!!response);
        }
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err.message : 'Unknown error');
          setIsAuth(false);
          setUser(null);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchUser();

    return () => {
      isMounted = false;
    };
  }, []);

  return { user: userData, loading, error, isAuthenticated: isAuth };
}

export function useFavorites() {
  const [favoritesList, setFavorites] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const fetchFavorites = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await favorites.getFavorites();
        
        if (isMounted) {
          setFavorites(Array.isArray(response) ? response : []);
        }
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err.message : 'Unknown error');
          setFavorites([]);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };
    fetchFavorites();

    return () => {
      isMounted = false;
    };
  }, []);

  return { favorites: favoritesList, loading, error };
}

import { movie, favorites } from './api';

export interface Movie {
  id: number;
  title: string;
  originalTitle: string;
  language: string;
  releaseYear: number;
  genres: string[];
  plot: string;
  runtime: number;
  budget: string | null;
  revenue: string | null;
  homepage: string;
  status: string;
  posterUrl: string;
  backdropUrl: string;
  trailerUrl: string;
  trailerYouTubeId: string;
  tmdbRating: number;
  searchL: string;
  keywords: string[];
  countriesOfOrigin: string[];
  languages: string[];
  cast: string[];
  director: string | null;
  production: string | null;
  awardsSummary: string | null;
}

export interface MoviesResponse {
  movies: Movie[];
  total: number;
}

export async function getMovies(params?: {
  genre?: string;
  year?: number;
  rating?: number;
  search?: string;
  page?: number;
  limit?: number;
}): Promise<MoviesResponse> {
  return movie.getMovies(params);
}

export async function getMovieById(id: string): Promise<Movie> {
  return movie.getMovieById(id);
}

export async function getTop10Movies(): Promise<MoviesResponse> {
  const response = await movie.getTop10();
  
  if (!Array.isArray(response)) {
    throw new Error('API не вернул корректный список фильмов (ожидается массив)');
  }
  
  return {
    movies: response,
    total: response.length,
  };
}

export async function getRandomMovie(): Promise<Movie> {
  return movie.getRandomMovie();
}

export async function getGenres(): Promise<string[]> {
  return movie.getGenres();
}

export async function searchMovies(query: string, params?: {
  page?: number;
  limit?: number;
}): Promise<MoviesResponse> {
  return getMovies({
    search: query,
    page: params?.page,
    limit: params?.limit
  });
}

export async function getMoviesByGenre(genre: string, params?: {
  page?: number;
  limit?: number;
}): Promise<MoviesResponse> {
  return getMovies({
    genre: genre,
    page: params?.page,
    limit: params?.limit
  });
}

export async function getFavorites(): Promise<Movie[]> {
  return favorites.getFavorites();
}

export async function addToFavorites(movieId: string): Promise<void> {
  return favorites.addFavorite(movieId);
}

export async function removeFromFavorites(movieId: string): Promise<void> {
  return favorites.removeFavorite(movieId);
}

export const movieApi = {
  getMovies,
  getMovieById,
  getTop10Movies,
  getRandomMovie,
  getGenres,
  searchMovies,
  getMoviesByGenre
};

export default movieApi;

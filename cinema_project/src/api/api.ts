import type { Movie } from "./movies";
import Cookies from 'js-cookie';

const API_BASE: string = 'https://cinemaguide.skillbox.cc';

export async function api<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const cleanEndpoint = endpoint.replace(/^\/+/, '');
  const url = `${API_BASE}/${cleanEndpoint}`;

  const token = Cookies.get('auth_token');

  const res = await fetch(url, {
    ...options,
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      ...(token && { 'Authorization': `Bearer ${token}` }),
      ...options.headers,
    },
  });

  if (!res.ok && res.status !== 401) {
    const data = await res.json().catch(() => ({ message: res.statusText }));
    throw new Error(data.message || `HTTP error! status: ${res.status}`);
  }

  if (res.status === 401) {
    Cookies.remove('auth_token');
    throw new Error('Пользователь не авторизован');
  }

  const responseData = await res.json().catch(() => null);
  if (!responseData) {
    throw new Error('API вернул пустой или некорректный ответ');
  }

  return responseData;
}

export interface User {
  name: string | null;
  surname: string | null;
  email: string;
  favorites: string[];
  avatar?: string;
}

export const auth = {
  login: async (email: string, password: string) => {
    const response = await api<{ token: string; user: User }>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    
    if (response.token) {
      Cookies.set('auth_token', response.token, {
        expires: 7,
        secure: true,
        sameSite: 'strict',
      });
    }
    
    return response;
  },
  logout: async () => {
    await api<void>('/auth/logout', { method: 'POST' });
    Cookies.remove('auth_token');
  },
};

export const user = {
  register: (form: {
    name: string;
    surname: string;
    email: string;
    password: string;
  }) => api<{ user: User }>('/user', {
    method: 'POST',
    body: JSON.stringify(form),
  }),

  profile: () => api<User | null>('/profile'),
};

export const favorites = {
  getFavorites: () => api<Movie[]>('/favorites'),

  addFavorite: (movieId: string) =>
    api<void>('/favorites', {
      method: 'POST',
      body: JSON.stringify({ id: movieId }),
    }),

  removeFavorite: (movieId: string) =>
    api<void>(`/favorites/${movieId}`, {
      method: 'DELETE',
    }),
};

export const movie = {
  getMovies: (filters?: {
    genre?: string;
    year?: number;
    rating?: number;
    search?: string;
    page?: number;
    limit?: number;
  }) => {
    const params = new URLSearchParams();
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== '') {
          params.append(key, value.toString());
        }
      });
    }

    return api<{ movies: Movie[]; total: number }>(`/movie?${params.toString()}`);
  },

  getTop10: () => api<Movie[]>('/movie/top10'),

  getGenres: () => api<string[]>('/movie/genres'),

  getMovieById: (movieId: string) => api<Movie>(`/movie/${movieId}`),

  getRandomMovie: () => api<Movie>('/movie/random'),
};

export default {
  auth,
  user,
  favorites,
  movie,
};

import { auth, user, type User } from './api';
import Cookies from 'js-cookie';

const TOKEN_COOKIE_KEY = 'auth_token';
const USER_COOKIE_KEY = 'user_data';

export interface AuthFormData {
  email: string;
  password: string;
  name?: string;
  surname?: string;
  confirmPassword?: string;
}

export async function login(formData: AuthFormData): Promise<User | null> {
  const loginResponse = await auth.login(formData.email, formData.password);
  const token = loginResponse.token || null;

  if (token) {
    Cookies.set(TOKEN_COOKIE_KEY, token, { expires: 7, secure: true, sameSite: 'strict' });
  }

  const userData = await fetchUserProfile();
  if (userData) {
    Cookies.set(USER_COOKIE_KEY, JSON.stringify(userData), { expires: 7, secure: true, sameSite: 'strict' });
    return userData;
  }
  return null;
}

export async function register(formData: AuthFormData): Promise<User | null> {
  await user.register({
    name: formData.name!,
    surname: formData.surname!,
    email: formData.email,
    password: formData.password,
  });
  return await login(formData);
}

export async function fetchUserProfile(): Promise<User | null> {
  try {
    const response = await user.profile();
    if (response) {
      return {
        name: response.name,
        surname: response.surname,
        email: response.email,
        favorites: response.favorites || [],
        avatar: response.avatar,
      };
    }
  } catch {
    removeUserFromCookies();
  }
  return null;
}

export function removeUserFromCookies() {
  Cookies.remove(USER_COOKIE_KEY);
  Cookies.remove(TOKEN_COOKIE_KEY);
}

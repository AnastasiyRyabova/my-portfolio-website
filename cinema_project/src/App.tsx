import React, { useState, useEffect } from 'react';
import { Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { user as userApi } from './api/api';
import type { User } from './api/api';
import Header from './components/Header/Header';
import Genres from './components/Genres/Genres';
import Main from './components/Main/Main';
import MoviesByGenre from './components/MoviesByGenre/MoviesByGenre';
import MoviePage from './components/MoviePage/MoviePage';
import AccountPage from './components/AccountPage/AccountPage';
import LoginModal from './components/LoginModal/LoginModal';
import Footer from './components/Footer/Footer';
import AccountSettings from './components/AccountSettings/AccountSettings';
import './App.css'
const USER_COOKIE_KEY = 'user_data';
const TOKEN_COOKIE_KEY = 'auth_token';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const loadUserFromCookies = async () => {
      setLoading(true);
      const userCookie = Cookies.get(USER_COOKIE_KEY);
      const tokenCookie = Cookies.get(TOKEN_COOKIE_KEY);
      
      if (userCookie && tokenCookie) {
        try {
          const userData: User = JSON.parse(userCookie);
          setUser(userData);
          
          const profileResponse = await userApi.profile();
          if (profileResponse) {
            setUser(profileResponse);
            Cookies.set(USER_COOKIE_KEY, JSON.stringify(profileResponse), {
              expires: 7,
              secure: true,
              sameSite: 'strict',
            });
          } else {
            Cookies.remove(USER_COOKIE_KEY);
            Cookies.remove(TOKEN_COOKIE_KEY);
            setUser(null);
          }
        } catch {
          Cookies.remove(USER_COOKIE_KEY);
          Cookies.remove(TOKEN_COOKIE_KEY);
          setUser(null);
        }
      } else {
        setUser(null);
      }
      
      setLoading(false);
    };

    loadUserFromCookies();
  }, []);

  const handleLogin = (userData: User) => {
    setUser(userData);
    Cookies.set(USER_COOKIE_KEY, JSON.stringify(userData), {
      expires: 7,
      secure: true,
      sameSite: 'strict',
    });
    setIsLoginModalOpen(false);
    navigate('/account');
  };

  const handleLogout = () => {
    Cookies.remove(USER_COOKIE_KEY);
    Cookies.remove(TOKEN_COOKIE_KEY);
    setUser(null);
    navigate('/home');
  };

  if (loading) {
    return <div>Загрузка приложения...</div>;
  }

  return (
    <>
      <Header
        user={user}
        setUser={setUser}
        setIsLoginModalOpen={setIsLoginModalOpen}
        handleLogout={handleLogout}
      />
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        setUser={handleLogin}
      />

      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/home" element={<Main user={user} setUser={setUser} />} />
        <Route path="/genres" element={<Genres />} />
        <Route path="/movies/:genre" element={<MoviesByGenre />} />
        <Route path="/movie/:id" element={<MoviePage user={user} setUser={setUser} />} />
        <Route
          path="/account"
          element={
            user ? (
              <AccountPage user={user} setUser={setUser} />
            ) : (
              <Navigate to="/home" replace />
            )
          }
        />
        <Route
          path="/account/settings"
          element={
            user ? (
              <AccountSettings user={user} setUser={setUser} />
            ) : (
              <Navigate to="/home" replace />
            )
          }
        />
      </Routes>

      <Footer />
    </>
  );
};

export default App;

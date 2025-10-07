import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ButtonLogin.css';
import type { User } from '../../api/api';

import userIcon from '../../image/user.svg';
import loginIcon from '../../image/login.svg';

export interface ButtonLoginProps {
  user: User | null;
  setIsLoginModalOpen: (open: boolean) => void;
  handleLogout: () => void;
}

const ButtonLogin: React.FC<ButtonLoginProps> = ({
  user,
  setIsLoginModalOpen,
}) => {
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth < 500);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 500);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleClick = () => {
    if (user) {
      navigate('/account');
    } else {
      setIsLoginModalOpen(true);
    }
  };

  if (isMobile) {
    return (
      <button
        className="header__login button-login--icon"
        onClick={handleClick}
        aria-label={user ? 'Личный кабинет' : 'Войти'}
      >
        <img
          src={user ? userIcon : loginIcon}
          alt={user ? 'User Icon' : 'Login Icon'}
          width={24}
          height={24}
        />
      </button>
    );
  }

  return user ? (
    <button
      className="header__login button__user-account"
      onClick={handleClick}
    >
      {user.name || 'Гость'}
    </button>
  ) : (
    <button
      className="header__login"
      onClick={() => setIsLoginModalOpen(true)}
    >
      Войти
    </button>
  );
};

export default ButtonLogin;

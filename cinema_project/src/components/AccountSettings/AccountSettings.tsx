import React from 'react';
import { useNavigate } from 'react-router-dom';
import './AccountSettings.css';
import mail from '../../image/iconMail.svg'
import Cookies from 'js-cookie';
import type { User } from '../../api/api';

interface AccountSettingsProps {
  user: User | null;
  setUser: (user: User | null) => void;
}

const AccountSettings: React.FC<AccountSettingsProps> = ({ user, setUser }) => {
  const navigate = useNavigate();
  
  const handleLogout = () => {
    Cookies.remove('user_data');
    Cookies.remove('auth_token');
    setUser(null);
    navigate('/');
  };
  
  if (!user) {
    return <div>Пользователь не авторизован</div>;
  }
  
  const initials = `${user.name?.charAt(0) || ''}${user.surname?.charAt(0) || ''}`.toUpperCase();
  
  return (
    <div className="account-settings">
      <div className="account-settings__info-block">
        <div className="account-settings__avatar" aria-label="User avatar">
          {initials}
        </div>
        <div className="account-settings__info-text">
          <p className="account-settings__label">Имя Фамилия</p>
          <p className="account-settings__value">{user.name || 'Не указано'} {user.surname || 'Не указано'}</p>
        </div>
      </div>
      <div className="account-settings__info-block">
        <div className="account-settings__avatar" aria-label="User avatar">
          <img className="account-settings__email-icon" alt="Email icon" src={mail}/>
        </div>
        <div className="account-settings__info-text">
          <p className="account-settings__label">Электронная почта</p>
          <p className="account-settings__value">{user.email || 'Не указано'}</p>
        </div>
      </div>
      <button 
        className="account-settings__logout-button account-page__logout" 
        onClick={handleLogout}
      >
        Выйти из аккаунта
      </button>
    </div>
  );
};

export default AccountSettings;

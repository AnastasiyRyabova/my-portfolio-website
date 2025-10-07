import React, { useState } from 'react';
import './AccountPage.css';
import FavoriteMovies from '../FavoriteMovies/FavoriteMovies';
import AccountSettings from '../AccountSettings/AccountSettings';
import type { User } from '../../api/api';
import setings from '../../image/login.svg'
import favorite from '../../image/like.png'

interface AccountPageProps {
  user: User | null;
  setUser: (user: User | null) => void;
}

const AccountPage: React.FC<AccountPageProps> = ({ user, setUser }) => {
  const [activeSection, setActiveSection] = useState<'favorites' | 'settings'>('favorites');

  if (!user) {
    return <div>Пользователь не авторизован</div>;
  }

  return (
    <div className="account-page">
      <h1 className="account-page__title">Мой аккаунт</h1>
      <div className="account-navigation">
        <h2 
          className="account-section__title" 
          onClick={() => setActiveSection('favorites')}
          style={{ 
            cursor: 'pointer', 
            borderBottom: activeSection === 'favorites' ? '1.5px solid rgba(220, 93, 252, 1)' : 'none',
            marginBottom: activeSection === 'favorites' ? '40px' : '0',
            paddingBottom: activeSection === 'favorites' ? '6px' : '0'
          }}
        >
          <img className='account-page__small-img' src={favorite}></img>
          Избранные <span className='account-page__small'>фильмы</span> 
        </h2>
        <h2 
          className="account-section__title" 
          onClick={() => setActiveSection('settings')}
          style={{ 
            cursor: 'pointer', 
            borderBottom: activeSection === 'settings' ? '1.5px solid rgba(220, 93, 252, 1)' : 'none',
            marginBottom: activeSection === 'settings' ? '40px' : '0',
            paddingBottom: activeSection === 'settings' ? '6px' : '0'
          }}
        >
          <img className='account-page__small-img' src={setings}></img>
          Настройка <span className='account-page__small'>аккаунта</span> 
        </h2>
      </div>
      
      <div className="account-content">
        {activeSection === 'favorites' && <FavoriteMovies user={user} setUser={setUser} />}
        {activeSection === 'settings' && <AccountSettings user={user} setUser={setUser} />}
      </div>
    </div>
  );
};

export default AccountPage;

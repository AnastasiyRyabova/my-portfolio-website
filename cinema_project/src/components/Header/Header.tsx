import React, { type Dispatch, type SetStateAction } from 'react';
import { Link } from 'react-router-dom';
import HeaderList from '../HeaderList/HeaderList';
import logo from '../../image/маруся-white.svg';
import './Header.css';
import type { User } from '../../api/api';

export interface HeaderProps {
  user: User | null;
  setUser: Dispatch<SetStateAction<User | null>>;
  setIsLoginModalOpen: (open: boolean) => void;
  handleLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({
  user,
  setUser,
  setIsLoginModalOpen,
  handleLogout,
}) => {
  return (
    <header className="header">
      <div className="header__logo">
        <Link to="/">
          <img src={logo} alt="Logo" className="header__img" />
        </Link>
      </div>

      <HeaderList
        user={user}
        setUser={setUser}
        setIsLoginModalOpen={setIsLoginModalOpen}
        handleLogout={handleLogout}
      />
    </header>
  );
};

export default Header;

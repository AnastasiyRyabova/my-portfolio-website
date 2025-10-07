import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import menuIcon from '../../image/menu.svg';
import './Menu.css';

interface MenuProps {
  items: { name: string; path: string }[];
}

const Menu: React.FC<MenuProps> = ({ items }) => {
  const location = useLocation();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 500);
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 500);
    window.addEventListener('resize', onResize);
    if (!isMobile) setShowMenu(false);
    return () => window.removeEventListener('resize', onResize);
  }, [isMobile]);

  if (isMobile) {
    return (
      <div className="menu-mobile">
        <button
          className="menu-icon-button"
          aria-label="Открыть меню"
          onClick={() => setShowMenu(!showMenu)}
        >
          <img src={menuIcon} alt="Меню" width={24} height={24} />
        </button>
        {showMenu && (
          <ul className="header-list-mobile">
            {items.map((item, index) => (
              <li className="header-list__item" key={index}>
                <Link
                  to={item.path}
                  className={location.pathname === item.path ? 'active' : ''}
                  onClick={() => setShowMenu(false)}
                >
                  {item.name}
                </Link>
                {location.pathname === item.path && <div className="underline" />}
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  }

  return (
    <ul className="header-list">
      {items.map((item, index) => (
        <li className="header-list__item" key={index}>
          <Link to={item.path} className={location.pathname === item.path ? 'active' : ''}>
            {item.name}
          </Link>
          {location.pathname === item.path && <div className="underline" />}
        </li>
      ))}
    </ul>
  );
};

export default Menu;

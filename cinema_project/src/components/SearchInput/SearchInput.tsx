import React, { useState, useEffect, useRef } from 'react';
import searchIcon from '../../image/search-white.svg';
import './SearchInput.css';

interface SearchInputProps {
  searchTerm: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus: () => void;
  onBlur: () => void;
  showDropdown: boolean;
  dropdownElement: React.ReactNode;
  onCloseMobileSearch?: () => void;
}

const SearchInput: React.FC<SearchInputProps> = ({
  searchTerm,
  onChange,
  onFocus,
  onBlur,
  showDropdown,
  dropdownElement,
  onCloseMobileSearch,
}) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 500);
  const [showInput, setShowInput] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 500);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  useEffect(() => {
    if (showInput && inputRef.current) {
      inputRef.current.focus();
    }
  }, [showInput]);

  const handleClose = () => {
    setShowInput(false);
    if (onCloseMobileSearch) onCloseMobileSearch();
  };

  if (isMobile) {
    return (
      <div className="search-input-mobile">
        {!showInput && (
          <button
            className="search-icon-button"
            aria-label="Открыть поиск"
            onClick={() => setShowInput(true)}
            type="button"
          >
            <img src={searchIcon} alt="Поиск" width={24} height={24} />
          </button>
        )}
        {showInput && (
          <div className="search-mobile-overlay">
            <div className="search-mobile-header" style={{ position: 'relative' }}>
              <input
                ref={inputRef}
                type="text"
                placeholder="Поиск"
                value={searchTerm}
                onChange={onChange}
                onBlur={onBlur}
                onFocus={onFocus}
                className="search-mobile-input "
                autoComplete="off"
              />
              <button
                className="search-mobile-close"
                aria-label="Закрыть поиск"
                onClick={handleClose}
                type="button"
              >
                ✕
              </button>
            </div>
            <div className="search-mobile-dropdown">
              {showDropdown && dropdownElement}
            </div>
          </div>
        )}
      </div>
    );
  }
  return (
    <>
      <input
        type="text"
        placeholder="Поиск"
        value={searchTerm}
        onChange={onChange}
        onBlur={onBlur}
        onFocus={onFocus}
        className="header__search header-list__search-container"
        autoComplete="off"
      />
      {showDropdown && dropdownElement}
      </>
  );
};

export default SearchInput;

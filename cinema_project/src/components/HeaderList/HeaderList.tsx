import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import './HeaderList.css';
import ButtonLogin from '../ButtonLogin/ButtonLogin';
import Dropdown from '../Dropdown/Dropdown';
import Menu from '../Menu/Menu';
import SearchInput from '../SearchInput/SearchInput';
import type { HeaderProps } from '../Header/Header';
import { searchMovies, type Movie } from '../../api/movies';

const HeaderList: React.FC<HeaderProps> = ({
  user,
  setIsLoginModalOpen,
  handleLogout,
}) => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [searchResults, setSearchResults] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [debounceTimeout, setDebounceTimeout] = useState<number | null>(null);

  const performSearch = useCallback(async (query: string) => {
    if (!query.trim()) {
      setSearchResults([]);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    try {
      const response = await searchMovies(query);

      const movies = response?.movies || response || [];
      const results = Array.isArray(movies) ? movies : [];

      const sortedResults = results.sort((a, b) => {
        const titleA = a.title?.toLowerCase() || '';
        const titleB = b.title?.toLowerCase() || '';
        const queryLower = query.toLowerCase();

        const aStartsWith = titleA.startsWith(queryLower);
        const bStartsWith = titleB.startsWith(queryLower);

        if (aStartsWith && !bStartsWith) return -1;
        if (!aStartsWith && bStartsWith) return 1;

        return titleA.localeCompare(titleB);
      });

      setSearchResults(sortedResults.slice(0, 5));
    } catch (error) {
      console.error('Search error:', error);
      setSearchResults([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (debounceTimeout !== null) {
      clearTimeout(debounceTimeout);
    }

    if (value.length > 0) {
      setShowDropdown(true);
      const timeout = window.setTimeout(() => {
        performSearch(value);
      }, 300);
      setDebounceTimeout(timeout);
    } else {
      setShowDropdown(false);
      setSearchResults([]);
    }
  };

  const handleSelect = (item: Movie) => {
    setSearchTerm(item.title || '');
    setShowDropdown(false);
    setSearchResults([]);
    navigate(`/movie/${item.id}`);
  };

  const handleBlur = () => {
    setTimeout(() => {
      setShowDropdown(false);
    }, 150);
  };

  const handleFocus = () => {
    if (searchTerm.length > 0) {
      setShowDropdown(true);
    }
  };

  useEffect(() => {
    return () => {
      if (debounceTimeout !== null) {
        clearTimeout(debounceTimeout);
      }
    };
  }, [debounceTimeout]);

  return (
    <>
      <Menu
        items={[
          { name: 'Главная', path: '/home' },
          { name: 'Жанры', path: '/genres' },
        ]}
      />
        <SearchInput
          searchTerm={searchTerm}
          onChange={handleChange}
          onBlur={handleBlur}
          onFocus={handleFocus}
          showDropdown={showDropdown}
          dropdownElement={
        <Dropdown
          items={searchResults}
          onSelect={handleSelect}
          isLoading={isLoading}
        />
        }
        />
      <ButtonLogin
        user={user}
        setIsLoginModalOpen={setIsLoginModalOpen}
        handleLogout={handleLogout}
      />
    </>
  );
};

export default HeaderList;

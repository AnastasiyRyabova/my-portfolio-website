import { useAppDispatch, useAppSelector } from './app/hooks';
import { toggleTheme, selectDarkMode } from './features/theme/themeSlice';
import './App.css';

export default function App() {
  const dispatch = useAppDispatch();
  const darkMode = useAppSelector(selectDarkMode);

  return (
    <div className={`app ${darkMode ? 'dark' : 'light'}`}>
      <button onClick={() => dispatch(toggleTheme())}>
        {darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
      </button>
      <h1>Hello word!</h1>
    </div>
  );
}

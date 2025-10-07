import { createSlice } from '@reduxjs/toolkit';

type ThemeState = {
  darkMode: boolean;
};

const initialState: ThemeState = {
  darkMode: false,
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleTheme(state) {
      state.darkMode = !state.darkMode;
    },
  },
});

export const { toggleTheme } = themeSlice.actions;

type RootState = {
  theme: ThemeState;
};

export const selectDarkMode = (state: RootState) => state.theme.darkMode;

export default themeSlice;

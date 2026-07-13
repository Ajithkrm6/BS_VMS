/**
 * Theme Redux Slice
 * Manages global theme state with persistence
 */

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from './index';
import { getThemeVariant } from '~/utils/themeConfig';

const THEME_STORAGE_KEY = 'bs-bench-sales-theme';

interface ThemeState {
  currentThemeId: string;
  isAutomatic: boolean; // Auto-detect based on system preference
}

/**
 * Load theme from localStorage
 */
const loadThemeFromStorage = (): string => {
  try {
    if (typeof window === 'undefined') return 'light';
    const stored = localStorage.getItem(THEME_STORAGE_KEY);
    return stored || 'light';
  } catch {
    return 'light';
  }
};

/**
 * Detect system theme preference
 */
const detectSystemTheme = (): string => {
  try {
    if (typeof window === 'undefined') return 'light';
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  } catch {
    return 'light';
  }
};

const initialState: ThemeState = {
  currentThemeId: loadThemeFromStorage(),
  isAutomatic: false,
};

export const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    /**
     * Set theme by ID
     */
    setTheme: (state, action: PayloadAction<string>) => {
      const themeId = action.payload;
      // Validate theme exists
      if (getThemeVariant(themeId)) {
        state.currentThemeId = themeId;
        state.isAutomatic = false;
        // Persist to localStorage
        try {
          localStorage.setItem(THEME_STORAGE_KEY, themeId);
        } catch {
          // Silently fail if localStorage not available
        }
      }
    },

    /**
     * Toggle between light and dark themes
     */
    toggleTheme: (state) => {
      state.currentThemeId = state.currentThemeId === 'dark' ? 'light' : 'dark';
      state.isAutomatic = false;
      try {
        localStorage.setItem(THEME_STORAGE_KEY, state.currentThemeId);
      } catch {
        // Silently fail if localStorage not available
      }
    },

    /**
     * Enable automatic theme detection (system preference)
     */
    setAutomaticTheme: (state) => {
      state.isAutomatic = true;
      state.currentThemeId = detectSystemTheme();
      try {
        localStorage.setItem(THEME_STORAGE_KEY, 'automatic');
      } catch {
        // Silently fail if localStorage not available
      }
    },

    /**
     * Disable automatic theme detection
     */
    disableAutomaticTheme: (state) => {
      state.isAutomatic = false;
    },
  },
});

export const { setTheme, toggleTheme, setAutomaticTheme, disableAutomaticTheme } =
  themeSlice.actions;

/**
 * Selector: Get current theme ID
 */
export const selectCurrentThemeId = (state: RootState) => state.theme.currentThemeId;

/**
 * Selector: Get current theme variant
 */
export const selectCurrentTheme = (state: RootState) => getThemeVariant(state.theme.currentThemeId);

/**
 * Selector: Get automatic theme status
 */
export const selectIsAutomaticTheme = (state: RootState) => state.theme.isAutomatic;

/**
 * Selector: Get if current theme is dark
 */
export const selectIsCurrentThemeDark = (state: RootState) =>
  getThemeVariant(state.theme.currentThemeId).isDark;

export default themeSlice.reducer;

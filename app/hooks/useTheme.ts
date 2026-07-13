/**
 * useTheme Hook
 * Easy access to theme state and actions throughout the app
 */

import { useAppDispatch, useAppSelector } from '~/stores';
import {
  setTheme,
  toggleTheme,
  setAutomaticTheme,
  disableAutomaticTheme,
  selectCurrentThemeId,
  selectCurrentTheme,
  selectIsAutomaticTheme,
  selectIsCurrentThemeDark,
} from '~/stores/themeSlice';
import { getAllThemes, getDarkThemes, getLightThemes } from '~/utils/themeConfig';

/**
 * useTheme - Complete theme management hook
 */
export function useTheme() {
  const dispatch = useAppDispatch();

  const currentThemeId = useAppSelector(selectCurrentThemeId);
  const currentTheme = useAppSelector(selectCurrentTheme);
  const isAutomatic = useAppSelector(selectIsAutomaticTheme);
  const isDark = useAppSelector(selectIsCurrentThemeDark);

  return {
    // Current state
    currentThemeId,
    currentTheme,
    isAutomatic,
    isDark,

    // Theme actions
    setTheme: (themeId: string) => dispatch(setTheme(themeId)),
    toggleTheme: () => dispatch(toggleTheme()),
    enableAutomatic: () => dispatch(setAutomaticTheme()),
    disableAutomatic: () => dispatch(disableAutomaticTheme()),

    // Theme lists
    allThemes: getAllThemes(),
    darkThemes: getDarkThemes(),
    lightThemes: getLightThemes(),

    // Utilities
    isDarkTheme: isDark,
    isLightTheme: !isDark,
    canToggle: currentThemeId === 'light' || currentThemeId === 'dark',
  };
}

/**
 * useThemeVariant - Get current theme variant (colors, name, etc)
 */
export function useThemeVariant() {
  const currentTheme = useAppSelector(selectCurrentTheme);
  return currentTheme;
}

/**
 * useThemeColors - Get current theme colors directly
 */
export function useThemeColors() {
  const currentTheme = useAppSelector(selectCurrentTheme);
  return currentTheme.colors;
}

/**
 * useIsDarkTheme - Check if current theme is dark
 */
export function useIsDarkTheme() {
  return useAppSelector(selectIsCurrentThemeDark);
}

/**
 * useThemeToggle - Simple toggle between light/dark
 */
export function useThemeToggle() {
  const dispatch = useAppDispatch();
  return {
    toggle: () => dispatch(toggleTheme()),
    isDark: useAppSelector(selectIsCurrentThemeDark),
  };
}

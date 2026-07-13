/**
 * Theme Components & Utilities
 * Central export point for all theme-related functionality
 */

export { ThemeProvider } from './ThemeProvider';
export { ThemeSwitcher, ThemeToggle, ThemeSelect, ThemeSelector } from './ThemeSwitcher';
export {
  ThemeIconButton,
  ThemeIconButtonWithText,
  ThemeIconButtonGhost,
  ThemeIconButtonOutline,
} from './ThemeIconButton';

export type { ThemeColors, ThemeVariant } from '~/utils/themeConfig';
export {
  THEME_VARIANTS,
  getThemeVariant,
  getAllThemes,
  getDarkThemes,
  getLightThemes,
} from '~/utils/themeConfig';

export {
  useTheme,
  useThemeVariant,
  useThemeColors,
  useIsDarkTheme,
  useThemeToggle,
} from '~/hooks/useTheme';

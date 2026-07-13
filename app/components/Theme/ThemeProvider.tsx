/**
 * ThemeProvider Component
 * Applies theme colors to the document and syncs with Redux state
 * Should be wrapped around the entire app
 */

import { useEffect } from 'react';
import { useTheme } from '~/hooks/useTheme';

interface ThemeProviderProps {
  children: React.ReactNode;
}

/**
 * Applies CSS variables for the current theme
 */
function applyThemeToCSSVariables(colors: Record<string, string>) {
  const root = document.documentElement;

  // Map theme color keys to CSS variable names
  const colorMapping: Record<string, string> = {
    background: '--background',
    foreground: '--foreground',
    card: '--card',
    cardForeground: '--card-foreground',
    popover: '--popover',
    popoverForeground: '--popover-foreground',
    muted: '--muted',
    mutedForeground: '--muted-foreground',
    accent: '--accent',
    accentForeground: '--accent-foreground',
    destructive: '--destructive',
    destructiveForeground: '--destructive-foreground',
    border: '--border',
    input: '--input',
    primary: '--primary',
    primaryForeground: '--primary-foreground',
    secondary: '--secondary',
    secondaryForeground: '--secondary-foreground',
    ring: '--ring',
    radius: '--radius',
  };

  // Apply each color as a CSS variable
  Object.entries(colorMapping).forEach(([key, cssVar]) => {
    const value = colors[key];
    if (value) {
      root.style.setProperty(cssVar, value);
    }
  });
}

/**
 * Apply theme class to document element
 * Useful for dark mode class-based theme switching
 */
function applyThemeClass(isDark: boolean) {
  const html = document.documentElement;

  if (isDark) {
    html.classList.add('dark');
  } else {
    html.classList.remove('dark');
  }
}

/**
 * ThemeProvider Component
 * Syncs Redux theme state with CSS variables
 */
export function ThemeProvider({ children }: ThemeProviderProps) {
  const { currentTheme, isDark } = useTheme();

  useEffect(() => {
    // Apply CSS variables
    applyThemeToCSSVariables(currentTheme.colors);

    // Apply dark mode class
    applyThemeClass(isDark);
  }, [currentTheme, isDark]);

  return <>{children}</>;
}

export default ThemeProvider;

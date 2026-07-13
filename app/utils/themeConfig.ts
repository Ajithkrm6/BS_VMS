/**
 * Theme Configuration
 * Define all available theme variants with their color schemes
 * Supports HSL color format for TailwindCSS integration
 */

export interface ThemeColors {
  background: string;
  foreground: string;
  card: string;
  cardForeground: string;
  popover: string;
  popoverForeground: string;
  muted: string;
  mutedForeground: string;
  accent: string;
  accentForeground: string;
  destructive: string;
  destructiveForeground: string;
  border: string;
  input: string;
  primary: string;
  primaryForeground: string;
  secondary: string;
  secondaryForeground: string;
  ring: string;
  radius: string;
}

export interface ThemeVariant {
  id: string;
  name: string;
  description: string;
  colors: ThemeColors;
  isDark: boolean;
}

/**
 * Light Theme - Professional Blue
 */
const lightTheme: ThemeColors = {
  background: '0 0% 100%',
  foreground: '222.2 84% 4.9%',
  card: '0 0% 100%',
  cardForeground: '222.2 84% 4.9%',
  popover: '0 0% 100%',
  popoverForeground: '222.2 84% 4.9%',
  muted: '221.2 63.6% 97%',
  mutedForeground: '215.4 16.3% 46.9%',
  accent: '222.2 47.6% 11.2%',
  accentForeground: '210 40% 98%',
  destructive: '0 84.2% 60.2%',
  destructiveForeground: '210 40% 98%',
  border: '214.3 31.8% 91.4%',
  input: '214.3 31.8% 91.4%',
  primary: '222.2 47.6% 11.2%',
  primaryForeground: '210 40% 98%',
  secondary: '210 40% 96%',
  secondaryForeground: '222.2 47.6% 11.2%',
  ring: '222.2 84% 4.9%',
  radius: '0.5rem',
};

/**
 * Dark Theme - Modern Dark
 */
const darkTheme: ThemeColors = {
  background: '222.2 84% 4.9%',
  foreground: '210 40% 98%',
  card: '222.2 84% 4.9%',
  cardForeground: '210 40% 98%',
  popover: '222.2 84% 4.9%',
  popoverForeground: '210 40% 98%',
  muted: '217.2 32.6% 17.5%',
  mutedForeground: '215 20.3% 65.1%',
  accent: '210 40% 96%',
  accentForeground: '222.2 47.6% 11.2%',
  destructive: '0 62.8% 30.6%',
  destructiveForeground: '210 40% 98%',
  border: '217.2 32.6% 17.5%',
  input: '217.2 32.6% 17.5%',
  primary: '210 40% 96%',
  primaryForeground: '222.2 47.6% 11.2%',
  secondary: '217.2 32.6% 17.5%',
  secondaryForeground: '210 40% 96%',
  ring: '212.7 26.8% 83.9%',
  radius: '0.5rem',
};

/**
 * Brand Theme - Corporate Green
 * Vibrant green-based professional theme
 */
const brandTheme: ThemeColors = {
  background: '0 0% 100%',
  foreground: '142 76% 20%',
  card: '0 0% 100%',
  cardForeground: '142 76% 20%',
  popover: '0 0% 100%',
  popoverForeground: '142 76% 20%',
  muted: '142 72% 95%',
  mutedForeground: '142 30% 50%',
  accent: '142 76% 36%',
  accentForeground: '0 0% 100%',
  destructive: '0 84.2% 60.2%',
  destructiveForeground: '210 40% 98%',
  border: '142 72% 90%',
  input: '142 72% 90%',
  primary: '142 76% 36%',
  primaryForeground: '0 0% 100%',
  secondary: '142 61% 80%',
  secondaryForeground: '142 76% 36%',
  ring: '142 76% 36%',
  radius: '0.5rem',
};

/**
 * Ocean Theme - Blue & Teal
 * Cool, professional ocean-inspired theme
 */
const oceanTheme: ThemeColors = {
  background: '0 0% 100%',
  foreground: '200 25% 20%',
  card: '0 0% 100%',
  cardForeground: '200 25% 20%',
  popover: '0 0% 100%',
  popoverForeground: '200 25% 20%',
  muted: '200 30% 92%',
  mutedForeground: '200 15% 50%',
  accent: '170 82% 39%',
  accentForeground: '0 0% 100%',
  destructive: '0 84.2% 60.2%',
  destructiveForeground: '210 40% 98%',
  border: '200 30% 88%',
  input: '200 30% 88%',
  primary: '200 100% 50%',
  primaryForeground: '0 0% 100%',
  secondary: '170 82% 39%',
  secondaryForeground: '0 0% 100%',
  ring: '200 100% 50%',
  radius: '0.5rem',
};

/**
 * Sunset Theme - Orange & Purple
 * Warm, creative sunset-inspired theme
 */
const sunsetTheme: ThemeColors = {
  background: '0 0% 100%',
  foreground: '260 80% 25%',
  card: '0 0% 100%',
  cardForeground: '260 80% 25%',
  popover: '0 0% 100%',
  popoverForeground: '260 80% 25%',
  muted: '260 70% 92%',
  mutedForeground: '260 30% 55%',
  accent: '39 100% 50%',
  accentForeground: '260 80% 25%',
  destructive: '0 84.2% 60.2%',
  destructiveForeground: '210 40% 98%',
  border: '260 70% 88%',
  input: '260 70% 88%',
  primary: '260 80% 50%',
  primaryForeground: '0 0% 100%',
  secondary: '39 100% 50%',
  secondaryForeground: '260 80% 25%',
  ring: '260 80% 50%',
  radius: '0.5rem',
};

/**
 * High Contrast Dark Theme
 * Enhanced accessibility with high contrast
 */
const highContrastDarkTheme: ThemeColors = {
  background: '0 0% 5%',
  foreground: '0 0% 98%',
  card: '0 0% 12%',
  cardForeground: '0 0% 98%',
  popover: '0 0% 12%',
  popoverForeground: '0 0% 98%',
  muted: '0 0% 25%',
  mutedForeground: '0 0% 85%',
  accent: '200 100% 60%',
  accentForeground: '0 0% 5%',
  destructive: '0 100% 65%',
  destructiveForeground: '0 0% 5%',
  border: '0 0% 35%',
  input: '0 0% 25%',
  primary: '200 100% 60%',
  primaryForeground: '0 0% 5%',
  secondary: '45 100% 55%',
  secondaryForeground: '0 0% 5%',
  ring: '200 100% 60%',
  radius: '0.5rem',
};

/**
 * All available theme variants
 */
export const THEME_VARIANTS: Record<string, ThemeVariant> = {
  light: {
    id: 'light',
    name: 'Light',
    description: 'Professional light theme with blue accents',
    colors: lightTheme,
    isDark: false,
  },
  dark: {
    id: 'dark',
    name: 'Dark',
    description: 'Modern dark theme for reduced eye strain',
    colors: darkTheme,
    isDark: true,
  },
  brand: {
    id: 'brand',
    name: 'Brand Green',
    description: 'Corporate green-based professional theme',
    colors: brandTheme,
    isDark: false,
  },
  ocean: {
    id: 'ocean',
    name: 'Ocean',
    description: 'Cool blue and teal ocean-inspired theme',
    colors: oceanTheme,
    isDark: false,
  },
  sunset: {
    id: 'sunset',
    name: 'Sunset',
    description: 'Warm orange and purple sunset-inspired theme',
    colors: sunsetTheme,
    isDark: false,
  },
  highContrastDark: {
    id: 'highContrastDark',
    name: 'High Contrast Dark',
    description: 'Enhanced dark theme for accessibility',
    colors: highContrastDarkTheme,
    isDark: true,
  },
};

/**
 * Get theme variant by ID
 */
export function getThemeVariant(themeId: string): ThemeVariant {
  return THEME_VARIANTS[themeId] || THEME_VARIANTS.light;
}

/**
 * Get all theme variants
 */
export function getAllThemes(): ThemeVariant[] {
  return Object.values(THEME_VARIANTS);
}

/**
 * Get dark themes
 */
export function getDarkThemes(): ThemeVariant[] {
  return Object.values(THEME_VARIANTS).filter((theme) => theme.isDark);
}

/**
 * Get light themes
 */
export function getLightThemes(): ThemeVariant[] {
  return Object.values(THEME_VARIANTS).filter((theme) => !theme.isDark);
}

/**
 * Component Theme System
 * Provides semantic color names for components
 * These map directly to Tailwind classes using the CSS variables
 */
export interface ComponentThemeColors {
  // Button styles
  buttonPrimary: string;
  buttonPrimaryText: string;
  buttonPrimaryHover: string;

  buttonSecondary: string;
  buttonSecondaryText: string;
  buttonSecondaryHover: string;

  buttonOutline: string;
  buttonOutlineText: string;
  buttonOutlineHover: string;

  buttonGhost: string;
  buttonGhostText: string;
  buttonGhostHover: string;

  // Text styles
  textPrimary: string;
  textSecondary: string;
  textMuted: string;
  textInverse: string;

  // Background styles
  bgPrimary: string;
  bgSecondary: string;
  bgMuted: string;
  bgHover: string;

  // Borders
  borderDefault: string;
  borderFocus: string;

  // Cards
  cardBg: string;
  cardText: string;
  cardBorder: string;

  // Status colors
  success: string;
  warning: string;
  error: string;
  info: string;
}

/**
 * Get component theme colors for light theme
 */
const getLightComponentTheme = (): ComponentThemeColors => ({
  // Button Primary (Blue)
  buttonPrimary: 'bg-primary',
  buttonPrimaryText: 'text-primary-foreground',
  buttonPrimaryHover: 'hover:bg-primary/90',

  // Button Secondary
  buttonSecondary: 'bg-secondary',
  buttonSecondaryText: 'text-secondary-foreground',
  buttonSecondaryHover: 'hover:bg-secondary/90',

  // Button Outline
  buttonOutline: 'border border-border bg-transparent',
  buttonOutlineText: 'text-foreground',
  buttonOutlineHover: 'hover:bg-accent hover:text-accent-foreground',

  // Button Ghost
  buttonGhost: 'bg-transparent',
  buttonGhostText: 'text-foreground',
  buttonGhostHover: 'hover:bg-muted',

  // Text
  textPrimary: 'text-foreground',
  textSecondary: 'text-muted-foreground',
  textMuted: 'text-muted-foreground',
  textInverse: 'text-primary-foreground',

  // Background
  bgPrimary: 'bg-background',
  bgSecondary: 'bg-card',
  bgMuted: 'bg-muted',
  bgHover: 'hover:bg-accent/10',

  // Borders
  borderDefault: 'border-border',
  borderFocus: 'focus:border-primary',

  // Cards
  cardBg: 'bg-card',
  cardText: 'text-card-foreground',
  cardBorder: 'border-border',

  // Status colors (added to tailwind separately)
  success: 'text-green-600',
  warning: 'text-yellow-600',
  error: 'text-red-600',
  info: 'text-blue-600',
});

/**
 * Get component theme colors for dark theme
 */
const getDarkComponentTheme = (): ComponentThemeColors => ({
  // Button Primary
  buttonPrimary: 'bg-primary',
  buttonPrimaryText: 'text-primary-foreground',
  buttonPrimaryHover: 'hover:bg-primary/80',

  // Button Secondary
  buttonSecondary: 'bg-secondary',
  buttonSecondaryText: 'text-secondary-foreground',
  buttonSecondaryHover: 'hover:bg-secondary/80',

  // Button Outline
  buttonOutline: 'border border-border bg-transparent',
  buttonOutlineText: 'text-foreground',
  buttonOutlineHover: 'hover:bg-accent/20 hover:text-accent-foreground',

  // Button Ghost
  buttonGhost: 'bg-transparent',
  buttonGhostText: 'text-foreground',
  buttonGhostHover: 'hover:bg-muted/50',

  // Text
  textPrimary: 'text-foreground',
  textSecondary: 'text-muted-foreground',
  textMuted: 'text-muted-foreground',
  textInverse: 'text-background',

  // Background
  bgPrimary: 'bg-background',
  bgSecondary: 'bg-card',
  bgMuted: 'bg-muted',
  bgHover: 'hover:bg-accent/20',

  // Borders
  borderDefault: 'border-border',
  borderFocus: 'focus:border-primary',

  // Cards
  cardBg: 'bg-card',
  cardText: 'text-card-foreground',
  cardBorder: 'border-border',

  // Status colors
  success: 'text-green-400',
  warning: 'text-yellow-400',
  error: 'text-red-400',
  info: 'text-blue-400',
});

/**
 * Get component theme colors based on current theme
 */
export function getComponentTheme(isDark: boolean): ComponentThemeColors {
  return isDark ? getDarkComponentTheme() : getLightComponentTheme();
}

/**
 * Component Style Builder
 * Combines multiple component theme colors into a single className
 */
export function buildComponentClass(...classes: (string | undefined | false)[]): string {
  return classes.filter(Boolean).join(' ');
}

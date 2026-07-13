# Theme System - Complete Usage Guide

## Overview

The theming system provides:

- ✅ **Centralized theme management** via Redux store
- ✅ **6 pre-built theme variants** (Light, Dark, Brand, Ocean, Sunset, High Contrast Dark)
- ✅ **Real-time theme switching** across the entire app
- ✅ **Persistent theme selection** with localStorage
- ✅ **CSS variable integration** with TailwindCSS
- ✅ **Automatic system preference detection**
- ✅ **Easy-to-use hooks** and components

---

## Architecture

### File Structure

```
app/
├── stores/
│   ├── themeSlice.ts          # Redux theme state management
│   └── index.ts                # Redux store (updated)
├── hooks/
│   └── useTheme.ts             # Theme hooks
├── utils/
│   └── themeConfig.ts          # Theme variants & colors
└── components/
    └── Theme/
        ├── ThemeProvider.tsx   # Apply theme CSS variables
        ├── ThemeSwitcher.tsx   # UI components for theme selection
        └── index.ts            # Export all theme utilities
```

### Data Flow

```
Redux Store (themeSlice)
    ↓
useTheme Hook
    ↓
ThemeProvider Component
    ↓
CSS Variables Applied to Document
    ↓
TailwindCSS Uses CSS Variables
    ↓
UI Updates Throughout App
```

---

## Setup - 3 Steps

### Step 1: Wrap App with ThemeProvider

In your root component (e.g., `app/root.tsx`):

```typescript
import { ThemeProvider } from '~/components/Theme';

export function RootComponent() {
  return (
    <ThemeProvider>
      {/* Your app content */}
      <YourAppContent />
    </ThemeProvider>
  );
}
```

### Step 2: Use Hooks Anywhere

```typescript
import { useTheme } from '~/hooks/useTheme';

export function MyComponent() {
  const { currentTheme, isDark, setTheme } = useTheme();

  return <div>{currentTheme.name}</div>;
}
```

### Step 3: Add Theme UI (Optional)

```typescript
import { ThemeSwitcher, ThemeToggle, ThemeSelect } from '~/components/Theme';

export function SettingsPage() {
  return (
    <div>
      <h2>Theme Settings</h2>
      <ThemeSwitcher />        {/* Shows all themes */}
      <ThemeToggle />           {/* Light/Dark toggle */}
      <ThemeSelect />           {/* Dropdown selector */}
    </div>
  );
}
```

---

## Usage Examples

### Example 1: Basic Theme Switching

```typescript
import { useTheme } from '~/hooks/useTheme';

export function ThemeSwitch() {
  const { currentThemeId, setTheme } = useTheme();

  return (
    <div>
      <p>Current Theme: {currentThemeId}</p>
      <button onClick={() => setTheme('dark')}>Dark</button>
      <button onClick={() => setTheme('light')}>Light</button>
      <button onClick={() => setTheme('brand')}>Brand Green</button>
    </div>
  );
}
```

### Example 2: Dark/Light Toggle

```typescript
import { useThemeToggle } from '~/hooks/useTheme';

export function DarkModeToggle() {
  const { isDark, toggle } = useThemeToggle();

  return (
    <button onClick={toggle}>
      {isDark ? '☀️ Light Mode' : '🌙 Dark Mode'}
    </button>
  );
}
```

### Example 3: Access Theme Colors

```typescript
import { useThemeColors } from '~/hooks/useTheme';

export function CustomComponent() {
  const colors = useThemeColors();

  return (
    <div
      style={{
        backgroundColor: `hsl(${colors.background})`,
        color: `hsl(${colors.foreground})`,
      }}
    >
      Custom styled content
    </div>
  );
}
```

### Example 4: Conditional Rendering Based on Theme

```typescript
import { useIsDarkTheme } from '~/hooks/useTheme';

export function MyComponent() {
  const isDark = useIsDarkTheme();

  return (
    <div>
      {isDark ? (
        <img src="/logo-white.png" alt="Logo" />
      ) : (
        <img src="/logo-dark.png" alt="Logo" />
      )}
    </div>
  );
}
```

### Example 5: Full Theme Selector Panel

```typescript
import { ThemeSelector } from '~/components/Theme';

export function SettingsPage() {
  return (
    <div className="p-8">
      <h1>Application Settings</h1>
      <ThemeSelector />  {/* Full interactive theme selector */}
    </div>
  );
}
```

### Example 6: Using in TopNavigation

```typescript
import { ThemeToggle } from '~/components/Theme';

export function TopNavigation() {
  return (
    <nav className="flex items-center justify-between p-4">
      <div>App Logo</div>
      <div className="flex gap-2">
        <ThemeToggle />  {/* Add theme toggle to navbar */}
      </div>
    </nav>
  );
}
```

---

## Available Hooks

### `useTheme()`

Complete theme management hook with all actions.

```typescript
const {
  currentThemeId, // Current theme ID (e.g., 'dark')
  currentTheme, // Full theme variant object
  isDark, // Boolean: is current theme dark?
  isAutomatic, // Boolean: is automatic detection on?
  allThemes, // Array: all available themes
  darkThemes, // Array: only dark themes
  lightThemes, // Array: only light themes
  setTheme, // Function: set theme by ID
  toggleTheme, // Function: toggle between light/dark
  enableAutomatic, // Function: enable system preference
  disableAutomatic, // Function: disable system preference
  isDarkTheme, // Boolean: same as isDark
  isLightTheme, // Boolean: opposite of isDark
  canToggle, // Boolean: can toggle? (light/dark only)
} = useTheme();
```

### `useThemeVariant()`

Get current theme variant with all colors and metadata.

```typescript
const theme = useThemeVariant();
// Returns: { id, name, description, colors, isDark }
```

### `useThemeColors()`

Get current theme colors directly as HSL strings.

```typescript
const colors = useThemeColors();
// Returns: { background, foreground, primary, ... }
```

### `useIsDarkTheme()`

Simple boolean to check if current theme is dark.

```typescript
const isDark = useIsDarkTheme();
```

### `useThemeToggle()`

Simple hook for light/dark toggle.

```typescript
const { isDark, toggle } = useThemeToggle();
```

---

## Available Theme Variants

| ID                 | Name               | Style             | Mode  |
| ------------------ | ------------------ | ----------------- | ----- |
| `light`            | Light              | Professional blue | Light |
| `dark`             | Dark               | Modern dark       | Dark  |
| `brand`            | Brand Green        | Corporate green   | Light |
| `ocean`            | Ocean              | Blue & teal       | Light |
| `sunset`           | Sunset             | Orange & purple   | Light |
| `highContrastDark` | High Contrast Dark | Accessible dark   | Dark  |

### Accessing Themes Programmatically

```typescript
import {
  THEME_VARIANTS,
  getThemeVariant,
  getAllThemes,
  getDarkThemes,
  getLightThemes,
} from '~/components/Theme';

// Get all themes
const all = getAllThemes();

// Get only dark themes
const darkOnly = getDarkThemes();

// Get only light themes
const lightOnly = getLightThemes();

// Get specific theme
const brand = getThemeVariant('brand');
const ocean = THEME_VARIANTS['ocean'];
```

---

## Creating Custom Themes

### Step 1: Define Theme Colors

In `app/utils/themeConfig.ts`:

```typescript
const customTheme: ThemeColors = {
  background: '0 0% 100%',
  foreground: '10 80% 20%',
  card: '0 0% 100%',
  cardForeground: '10 80% 20%',
  primary: '10 100% 50%',
  primaryForeground: '0 0% 100%',
  // ... other colors
};
```

### Step 2: Add to THEME_VARIANTS

```typescript
export const THEME_VARIANTS: Record<string, ThemeVariant> = {
  // ... existing themes
  custom: {
    id: 'custom',
    name: 'My Custom Theme',
    description: 'My custom color scheme',
    colors: customTheme,
    isDark: false,
  },
};
```

### Step 3: Use Immediately

```typescript
const { setTheme } = useTheme();
setTheme('custom'); // Theme is applied instantly!
```

---

## Redux Integration

### Actions Available

```typescript
import { setTheme, toggleTheme, setAutomaticTheme } from '~/stores/themeSlice';
import { useAppDispatch } from '~/stores';

const dispatch = useAppDispatch();

// Set specific theme
dispatch(setTheme('dark'));

// Toggle between light and dark
dispatch(toggleTheme());

// Enable automatic detection (system preference)
dispatch(setAutomaticTheme());
```

### Selectors Available

```typescript
import {
  selectCurrentThemeId,
  selectCurrentTheme,
  selectIsAutomaticTheme,
  selectIsCurrentThemeDark,
} from '~/stores/themeSlice';

// Use in components
const themeId = useAppSelector(selectCurrentThemeId);
```

---

## Features

### ✅ Persistent Storage

Theme choice is saved to localStorage and restored on app reload.

```typescript
// Automatically saved
setTheme('dark'); // Saved to localStorage['bs-bench-sales-theme']
```

### ✅ System Preference Detection

Automatically detect and use system dark/light preference.

```typescript
const { enableAutomatic, isAutomatic } = useTheme();

// Enable system preference detection
enableAutomatic();

// Check if automatic is enabled
if (isAutomatic) {
  console.log('Using system preference');
}
```

### ✅ CSS Variable Injection

Theme colors are injected as CSS variables automatically.

```css
/* Automatically available in any CSS/Tailwind */
background-color: hsl(var(--background));
color: hsl(var(--foreground));
border: 1px solid hsl(var(--border));
```

### ✅ Dark Mode Class

Dark mode class is automatically added to `<html>` element.

```html
<!-- When dark theme is active -->
<html class="dark" style="--background: 222.2 84% 4.9%; ..."></html>
```

---

## Best Practices

### 1. Use Theme CSS Variables in Components

```typescript
// ✅ Good - Uses theme colors
<div className="bg-background text-foreground border border-border">
  Content
</div>

// ❌ Avoid - Hardcoded colors
<div style={{ backgroundColor: '#000', color: '#fff' }}>
  Content
</div>
```

### 2. Use useTheme Hook for Logic

```typescript
// ✅ Good
const { isDark } = useTheme();
if (isDark) {
  // dark theme specific logic
}

// ✅ Also good
const isDark = useIsDarkTheme();
```

### 3. Extend with Custom Themes

```typescript
// ✅ Good - Add to config and reuse
THEME_VARIANTS.myTheme = { ... };

// ❌ Avoid - Inline theme colors
const colors = { ... };
```

### 4. Theme Selector in Settings

```typescript
// ✅ Good - Let users choose
<ThemeSelector />

// ❌ Avoid - Force theme
setTheme('dark');
```

---

## Troubleshooting

### Theme Not Applying

- Ensure `<ThemeProvider>` wraps your entire app
- Check browser console for errors
- Verify theme ID is valid

### localStorage Warning

The system silently fails if localStorage is unavailable. No error is thrown.

### CSS Variables Not Working

- Ensure TailwindCSS is configured to use CSS variables
- Check that `root.css` has the CSS variable definitions
- Verify theme colors are valid HSL values

### Dark Mode Class Not Applied

- Check that `tailwind.config.js` has `darkMode: ['class']`
- Verify the dark mode class is being added to `<html>` element

---

## Summary

The theme system provides a **complete, production-ready solution** for:

- 🎨 Managing themes centrally with Redux
- 🔄 Real-time theme switching app-wide
- 💾 Persistent user preferences
- 🎯 Easy-to-use hooks and components
- 🌓 Dark/light mode support
- ♿ Accessibility considerations
- 🎭 6 pre-built professional themes
- ➕ Easy custom theme creation

# Unified Theming System - Complete Guide

## Overview

The BS-VMS application now has a **unified, centralized theming system** that controls all colors and styling across the entire application from a **single location**.

---

## Architecture

```
┌─────────────────────────────────────────────────────┐
│         Redux Theme Store (themeSlice.ts)           │
│  - Manages current theme ID                         │
│  - Persists to localStorage                         │
│  - Detects system preferences                       │
└─────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────┐
│       Theme Configuration (themeConfig.ts)          │
│  - 6 pre-built theme variants                       │
│  - Component-specific color mappings                │
│  - Semantic color names (primary, secondary, etc.)  │
└─────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────┐
│      ThemeProvider Component                        │
│  - Applies CSS variables to document               │
│  - Syncs with Redux state                          │
└─────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────┐
│      Tailwind CSS Configuration                     │
│  - Uses CSS variables for all colors               │
│  - Maps to theme colors automatically              │
└─────────────────────────────────────────────────────┘
```

---

## File Structure

### 1. **app/stores/themeSlice.ts** (Redux Store)

- State: Current theme ID, automatic theme preference flag
- Actions: `setTheme()`, `toggleTheme()`, `setAutomaticTheme()`, `disableAutomaticTheme()`
- Selectors: `selectCurrentThemeId`, `selectCurrentTheme`, `selectIsCurrentThemeDark`
- **Persistence**: Saves to localStorage automatically

### 2. **app/utils/themeConfig.ts** (Theme Definition)

- **THEME_VARIANTS**: 6 theme definitions (light, dark, brand, ocean, sunset, highContrastDark)
- **ComponentThemeColors** interface: Semantic color names for components
- **Component theme functions**: `getComponentTheme()`, `buildComponentClass()`
- Helper functions: `getThemeVariant()`, `getAllThemes()`, `getDarkThemes()`, `getLightThemes()`

### 3. **app/hooks/useTheme.ts** (React Hooks)

- `useTheme()`: Complete theme management
- `useComponentTheme()`: Get semantic component colors (NEW!)
- `useThemeVariant()`: Get current theme colors
- `useThemeToggle()`: Simple light/dark toggle
- `useIsDarkTheme()`: Check if dark theme active

### 4. **app/components/Theme/ThemeProvider.tsx**

- Applies CSS variables to document root
- Syncs with Redux state changes
- Automatically updates app when theme changes

### 5. **tailwind.config.js**

- Configured to use CSS variables for all colors
- Maps to theme colors from document CSS variables

---

## How to Use

### Step 1: Wrap Your App with ThemeProvider

In **app/main.tsx**:

```tsx
import { ThemeProvider } from '~/components/Theme/ThemeProvider';

function AppContent() {
  const store = getStore();

  return (
    <ReduxProvider store={store}>
      <ThemeProvider>{/* Your app content */}</ThemeProvider>
    </ReduxProvider>
  );
}
```

### Step 2: Use Component Theme in Your Components

#### Option A: Simple Component (Recommended)

```tsx
import { useComponentTheme } from '~/hooks/useTheme';
import { Button } from '~/components/ui/button';

export function MyComponent() {
  const componentTheme = useComponentTheme();

  return (
    <Button
      className={`${componentTheme.buttonPrimary} ${componentTheme.buttonPrimaryText} ${componentTheme.buttonPrimaryHover} px-6 py-2 rounded`}
    >
      Click Me
    </Button>
  );
}
```

#### Option B: Card Component

```tsx
import { useComponentTheme } from '~/hooks/useTheme';
import { Card } from '~/components/ui/card';

export function MyCard() {
  const componentTheme = useComponentTheme();

  return (
    <Card
      className={`${componentTheme.cardBg} ${componentTheme.cardText} ${componentTheme.cardBorder}`}
    >
      <h2 className={componentTheme.textPrimary}>Card Title</h2>
      <p className={componentTheme.textSecondary}>Card description goes here</p>
    </Card>
  );
}
```

#### Option C: Complex Layout

```tsx
export function ComplexLayout() {
  const componentTheme = useComponentTheme();

  return (
    <div className={`${componentTheme.bgPrimary} ${componentTheme.textPrimary}`}>
      {/* Background and text color adjust automatically */}

      <div className={`${componentTheme.bgSecondary} rounded p-4`}>
        {/* Secondary background for nested content */}
      </div>

      <button
        className={`${componentTheme.buttonPrimary} ${componentTheme.buttonPrimaryText} px-4 py-2 rounded`}
      >
        {/* Primary button with automatic colors */}
      </button>
    </div>
  );
}
```

---

## Available Component Theme Colors

### Button Colors

- `buttonPrimary`: Primary button background
- `buttonPrimaryText`: Primary button text color
- `buttonPrimaryHover`: Primary button hover state

- `buttonSecondary`: Secondary button background
- `buttonSecondaryText`: Secondary button text color
- `buttonSecondaryHover`: Secondary button hover state

- `buttonOutline`: Outline button border style
- `buttonOutlineText`: Outline button text color
- `buttonOutlineHover`: Outline button hover state

- `buttonGhost`: Ghost button background (transparent)
- `buttonGhostText`: Ghost button text color
- `buttonGhostHover`: Ghost button hover state

### Text Colors

- `textPrimary`: Main text color
- `textSecondary`: Secondary/muted text color
- `textMuted`: Muted text (for hints, placeholders)
- `textInverse`: Inverted text (light on dark, dark on light)

### Background Colors

- `bgPrimary`: Main background color
- `bgSecondary`: Secondary background (cards, sections)
- `bgMuted`: Muted background (for less important areas)
- `bgHover`: Hover state background

### Border & Focus

- `borderDefault`: Default border color
- `borderFocus`: Focus state border color

### Card Styles

- `cardBg`: Card background color
- `cardText`: Card text color
- `cardBorder`: Card border color

### Status Colors

- `success`: Success/positive state
- `warning`: Warning state
- `error`: Error/negative state
- `info`: Information state

---

## Theme Variants

### Available Themes

| Theme                  | Type  | Use Case                          |
| ---------------------- | ----- | --------------------------------- |
| **Light**              | Light | Professional, bright environments |
| **Dark**               | Dark  | Reduced eye strain, night mode    |
| **Brand Green**        | Light | Corporate branding with green     |
| **Ocean**              | Light | Cool, professional blue/teal      |
| **Sunset**             | Light | Creative, warm orange/purple      |
| **High Contrast Dark** | Dark  | Accessibility, high contrast      |

### How to Switch Themes

```tsx
import { useTheme } from '~/hooks/useTheme';

export function ThemeSwitcher() {
  const { currentThemeId, setTheme, allThemes } = useTheme();

  return (
    <div>
      {allThemes.map((theme) => (
        <button
          key={theme.id}
          onClick={() => setTheme(theme.id)}
          className={currentThemeId === theme.id ? 'active' : ''}
        >
          {theme.name}
        </button>
      ))}
    </div>
  );
}
```

---

## System Color Detection

Automatically detect and use system color preference:

```tsx
import { useTheme } from '~/hooks/useTheme';

export function ThemedComponent() {
  const { enableAutomatic, disableAutomatic, isAutomatic } = useTheme();

  return (
    <>
      <button onClick={enableAutomatic}>Use System Preference</button>
      <button onClick={disableAutomatic}>Use Manual Theme</button>
      <p>Auto mode: {isAutomatic ? 'On' : 'Off'}</p>
    </>
  );
}
```

---

## Adding Custom Themes

To add a new theme, edit **app/utils/themeConfig.ts**:

```tsx
// 1. Define new theme colors
const myCustomTheme: ThemeColors = {
  background: '0 0% 100%',
  foreground: '220 10% 10%',
  primary: '280 100% 50%',
  primaryForeground: '0 0% 100%',
  // ... all other colors
};

// 2. Add to THEME_VARIANTS
export const THEME_VARIANTS: Record<string, ThemeVariant> = {
  // ... existing themes
  myCustom: {
    id: 'myCustom',
    name: 'My Custom Theme',
    description: 'Custom theme for specific use case',
    colors: myCustomTheme,
    isDark: false,
  },
};
```

---

## Migration Guide

### Before (Hardcoded Colors)

```tsx
<div className="bg-[#F7F9FB] text-[#002045]">
  <button className="bg-[#136DEC] text-white hover:bg-[#0f5dd0]">Click me</button>
</div>
```

### After (Theme-Based)

```tsx
import { useComponentTheme } from '~/hooks/useTheme';

export function MyComponent() {
  const componentTheme = useComponentTheme();

  return (
    <div className={`${componentTheme.bgMuted} ${componentTheme.textPrimary}`}>
      <button
        className={`${componentTheme.buttonPrimary} ${componentTheme.buttonPrimaryText} ${componentTheme.buttonPrimaryHover}`}
      >
        Click me
      </button>
    </div>
  );
}
```

### Benefits

✅ All colors change instantly when theme switches  
✅ Single source of truth for all colors  
✅ Easy to add new themes  
✅ System preference detection  
✅ Persistence across page reloads  
✅ Fully type-safe  
✅ No hardcoded hex codes scattered throughout codebase

---

## Best Practices

### ✅ Do's

- Use `useComponentTheme()` hook in components
- Combine multiple theme classes for complex layouts
- Create reusable component wrappers with theme colors
- Test components in all 6 theme variants
- Use semantic color names (not hardcoded hex)

### ❌ Don'ts

- Hardcode hex colors in components
- Use direct RGB/HSL values
- Bypass the theme system
- Create theme-specific component logic
- Assume light theme only

---

## Examples

### Example 1: Navigation Bar

```tsx
export function NavigationBar() {
  const componentTheme = useComponentTheme();

  return (
    <nav className={`${componentTheme.bgPrimary} ${componentTheme.borderDefault} border-b`}>
      <div className="flex items-center justify-between px-4 py-3">
        <h1 className={`text-xl font-bold ${componentTheme.textPrimary}`}>Brand</h1>
        <button className={`${componentTheme.buttonGhost} ${componentTheme.buttonGhostText}`}>
          Menu
        </button>
      </div>
    </nav>
  );
}
```

### Example 2: Hero Section

```tsx
export function HeroSection() {
  const componentTheme = useComponentTheme();

  return (
    <section className={`${componentTheme.bgSecondary} ${componentTheme.cardText} py-12 px-4`}>
      <h1 className="text-4xl font-bold mb-4">Welcome</h1>
      <p className={componentTheme.textSecondary}>Subheading text here</p>
      <button
        className={`${componentTheme.buttonPrimary} ${componentTheme.buttonPrimaryText} ${componentTheme.buttonPrimaryHover} mt-6 px-6 py-2 rounded`}
      >
        Get Started
      </button>
    </section>
  );
}
```

### Example 3: Form Component

```tsx
export function LoginForm() {
  const componentTheme = useComponentTheme();

  return (
    <form className={`${componentTheme.cardBg} ${componentTheme.cardText} p-6 rounded`}>
      <input
        placeholder="Email"
        className={`w-full border ${componentTheme.borderDefault} ${componentTheme.bgPrimary} p-2 mb-4 rounded`}
      />
      <button
        className={`w-full ${componentTheme.buttonPrimary} ${componentTheme.buttonPrimaryText} ${componentTheme.buttonPrimaryHover} py-2 rounded`}
      >
        Login
      </button>
    </form>
  );
}
```

---

## Troubleshooting

### Q: Colors not changing when theme switches?

**A:** Make sure component uses `useComponentTheme()` hook. Components without this hook won't react to theme changes.

### Q: Hardcoded colors still visible?

**A:** Search for hex colors (`#[A-F0-9]{6}`) in JSX files and replace with `useComponentTheme()`.

### Q: How do I override theme colors for specific components?

**A:** You can add inline classes after theme classes:

```tsx
<button className={`${componentTheme.buttonPrimary} custom-override-class`}>
```

### Q: Can I use theme colors outside of React components?

**A:** Yes, via CSS variables directly:

```css
.my-class {
  color: hsl(var(--primary));
  background: hsl(var(--card));
}
```

---

## Performance Notes

- ✅ Theme switching is instant (no re-renders needed)
- ✅ CSS variables are efficient
- ✅ Theme data is small (< 2KB)
- ✅ localStorage persistence is non-blocking

---

## Support

For issues or questions:

1. Check if component has `useComponentTheme()` hook
2. Verify ThemeProvider is wrapping your app
3. Check Redux store includes themeReducer
4. Review examples in this guide
5. Check component theme colors available

---

## Summary

The unified theming system provides:

- **Single source of truth**: All colors in themeConfig.ts
- **6 pre-built themes**: Light, Dark, Brand, Ocean, Sunset, High Contrast
- **Automatic persistence**: Saves theme preference
- **System detection**: Respects OS dark mode preference
- **Full TypeScript support**: All colors are type-safe
- **Easy migration**: Simple hook-based API
- **Production-ready**: Used throughout the application

🎨 **Start using theme colors in all new components!**

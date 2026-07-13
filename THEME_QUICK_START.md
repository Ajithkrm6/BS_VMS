# Theme System - Quick Start

## 5-Minute Setup

### 1. Wrap Your App with ThemeProvider

In your main app component (`app/root.tsx` or wherever your app renders):

```typescript
import { ThemeProvider } from '~/components/Theme';

export function App() {
  return (
    <ThemeProvider>
      {/* All your app content here */}
      <Layout>
        <Routes />
      </Layout>
    </ThemeProvider>
  );
}
```

### 2. Add Theme Controls to Navigation

In your TopNavigation component:

```typescript
import { ThemeToggle } from '~/components/Theme';

export function TopNavigation() {
  return (
    <nav className="flex items-center justify-between p-4 border-b">
      <h1>My App</h1>
      <ThemeToggle />  {/* 🎨 Add this line */}
    </nav>
  );
}
```

**Done!** Your app now has theme switching. 🎉

---

## Using Themes in Your Code

### Change Theme Programmatically

```typescript
import { useTheme } from '~/hooks/useTheme';

export function MyComponent() {
  const { setTheme, currentThemeId } = useTheme();

  return (
    <div>
      <p>Current: {currentThemeId}</p>
      <button onClick={() => setTheme('dark')}>Dark</button>
      <button onClick={() => setTheme('light')}>Light</button>
    </div>
  );
}
```

### Use Theme Colors in Styling

```typescript
import { useThemeColors } from '~/hooks/useTheme';

export function CustomCard() {
  const colors = useThemeColors();

  return (
    <div
      style={{
        backgroundColor: `hsl(${colors.background})`,
        color: `hsl(${colors.foreground})`,
        padding: '1rem',
      }}
    >
      Custom styled with theme colors
    </div>
  );
}
```

### Tailwind CSS Classes Work Automatically

```typescript
export function StyledComponent() {
  return (
    <div className="bg-background text-foreground border border-border rounded-lg p-4">
      {/* All Tailwind theme classes automatically use current theme */}
    </div>
  );
}
```

---

## Theme Components

### 🔘 ThemeToggle

Simple light/dark toggle button

```typescript
import { ThemeToggle } from '~/components/Theme';

<ThemeToggle />  {/* ☀️ Light / 🌙 Dark */}
```

### 📋 ThemeSelect

Dropdown menu with all themes

```typescript
import { ThemeSelect } from '~/components/Theme';

<ThemeSelect />  {/* Select from dropdown */}
```

### 🎨 ThemeSwitcher

Grid of theme buttons with color previews

```typescript
import { ThemeSwitcher } from '~/components/Theme';

<ThemeSwitcher />  {/* Visual grid of themes */}
```

### 🎭 ThemeSelector

Full featured theme panel (for settings page)

```typescript
import { ThemeSelector } from '~/components/Theme';

<ThemeSelector />  {/* Complete theme selection UI */}
```

---

## Available Themes

```
Light Themes:
  • light        - Professional blue
  • brand        - Corporate green
  • ocean        - Blue & teal
  • sunset       - Orange & purple

Dark Themes:
  • dark         - Modern dark
  • highContrastDark - Accessible dark
```

Set any theme:

```typescript
const { setTheme } = useTheme();

setTheme('brand'); // Switch to brand theme
setTheme('highContrastDark'); // Switch to accessible dark
// ... etc
```

---

## Common Patterns

### Pattern 1: Settings Page

```typescript
import { ThemeSelector } from '~/components/Theme';
import { Card } from '~/components/Common/Card';

export function SettingsPage() {
  return (
    <div className="p-8">
      <Card className="p-6">
        <h2 className="text-2xl font-bold mb-6">Appearance Settings</h2>
        <ThemeSelector />
      </Card>
    </div>
  );
}
```

### Pattern 2: Navbar Theme Toggle

```typescript
import { ThemeToggle } from '~/components/Theme';

export function Navbar() {
  return (
    <header className="border-b">
      <div className="flex justify-between items-center p-4">
        <Logo />
        <ThemeToggle />
      </div>
    </header>
  );
}
```

### Pattern 3: User Preferences

```typescript
import { useTheme } from '~/hooks/useTheme';
import { useEffect } from 'react';

export function UserSettings() {
  const { currentThemeId, setTheme } = useTheme();

  // Load user's saved theme preference
  useEffect(() => {
    const saved = localStorage.getItem('userThemePref');
    if (saved) setTheme(saved);
  }, []);

  return <ThemeSelector />;
}
```

### Pattern 4: Conditional UI Based on Theme

```typescript
import { useIsDarkTheme } from '~/hooks/useTheme';

export function Logo() {
  const isDark = useIsDarkTheme();

  return (
    <img
      src={isDark ? '/logo-light.png' : '/logo-dark.png'}
      alt="Logo"
    />
  );
}
```

---

## Where Everything Lives

| What                    | Where                                    |
| ----------------------- | ---------------------------------------- |
| **Theme Configuration** | `app/utils/themeConfig.ts`               |
| **Redux State**         | `app/stores/themeSlice.ts`               |
| **Provider Component**  | `app/components/Theme/ThemeProvider.tsx` |
| **UI Components**       | `app/components/Theme/ThemeSwitcher.tsx` |
| **Hooks**               | `app/hooks/useTheme.ts`                  |
| **All Exports**         | `app/components/Theme/index.ts`          |

---

## What's Included

✅ **Redux Store** - Centralized theme state  
✅ **6 Pre-built Themes** - Ready to use  
✅ **localStorage Persistence** - Theme saved between sessions  
✅ **CSS Variables** - Integrated with Tailwind  
✅ **Custom Hooks** - Easy access to theme anywhere  
✅ **UI Components** - Toggle, selector, switcher  
✅ **Dark Mode Support** - Full dark mode class handling  
✅ **System Preference** - Auto-detect user preference  
✅ **Accessibility** - High contrast theme option  
✅ **Easy to Extend** - Add custom themes easily

---

## Next Steps

1. ✅ Wrap app with `<ThemeProvider>`
2. ✅ Add `<ThemeToggle />` to navbar
3. ✅ Use theme colors in your components
4. ✅ Create a settings page with `<ThemeSelector />`
5. ✅ (Optional) Add custom themes to `themeConfig.ts`

---

## Full Documentation

See [THEME_SYSTEM_GUIDE.md](./THEME_SYSTEM_GUIDE.md) for complete documentation.

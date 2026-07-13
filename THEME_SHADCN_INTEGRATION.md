# Theme System - shadcn Components Integration

## Overview

The entire theme system has been refactored to use **shadcn UI components** instead of plain HTML elements. This ensures consistency with your design system and makes theming work seamlessly.

---

## Components Refactored

### 1. **ThemeIconButton Variants** ✅

All theme button components now use `shadcn Button`:

```typescript
import { Button } from '~/components/ui/button';
import {
  ThemeIconButton,
  ThemeIconButtonWithText,
  ThemeIconButtonGhost,
  ThemeIconButtonOutline,
} from '~/components/Theme';

// Standard - uses Button with ghost variant
<ThemeIconButton size="icon" />

// With Text - uses Button with outline variant
<ThemeIconButtonWithText />

// Ghost - uses Button with ghost variant and icon-sm size
<ThemeIconButtonGhost />

// Outline - uses Button with outline variant and icon size
<ThemeIconButtonOutline />
```

**Size Options** (from shadcn Button):

- `icon-xs` - Extra small (size-6)
- `icon-sm` - Small (size-7)
- `icon` - Default (size-8)
- `icon-lg` - Large (size-9)

---

### 2. **TopNavigation Component** ✅

Replaced all plain buttons with shadcn components:

```typescript
import { Button } from '~/components/ui/button';
import { ThemeIconButton } from '~/components/Theme';

export function TopNavigation() {
  return (
    <header>
      {/* Menu button - shadcn Button */}
      <Button variant="ghost" size="icon" onClick={onMenuToggle}>
        ☰
      </Button>

      {/* Notification button - shadcn Button */}
      <Button variant="ghost" size="icon">
        🔔
      </Button>

      {/* Theme toggle - ThemeIconButton (uses shadcn Button internally) */}
      <ThemeIconButton size="icon" />

      {/* User menu - shadcn Button */}
      <Button variant="ghost" onClick={toggleUserMenu}>
        👤
      </Button>
    </header>
  );
}
```

---

### 3. **ThemeSwitcher Component** ✅

Updated all selector buttons to use shadcn Button:

```typescript
import { Button } from '~/components/ui/button';
import { useTheme } from '~/hooks/useTheme';

export function ThemeSwitcher() {
  const { currentThemeId, setTheme, allThemes } = useTheme();

  return (
    <div>
      {allThemes.map((theme) => (
        <Button
          key={theme.id}
          onClick={() => setTheme(theme.id)}
          variant={currentThemeId === theme.id ? 'default' : 'outline'}
        >
          {theme.name}
        </Button>
      ))}
    </div>
  );
}
```

---

### 4. **ThemeExample Component** ✅

All demo buttons now use shadcn Button:

```typescript
import { Button } from '~/components/ui/button';
import { Card } from '~/components/ui/card';
import { useTheme } from '~/hooks/useTheme';

export function ThemeExample() {
  const { isDark, toggleTheme, setTheme } = useTheme();

  return (
    <>
      {/* Quick actions */}
      <Button onClick={toggleTheme} variant="default">
        {isDark ? '☀️ Light' : '🌙 Dark'}
      </Button>

      {/* Theme selector */}
      <Button onClick={() => setTheme('dark')} variant="outline">
        Dark Theme
      </Button>

      {/* Card from shadcn */}
      <Card className="p-6">
        <h2>Theme Settings</h2>
      </Card>
    </>
  );
}
```

---

### 5. **ThemeIconButtonShowcase Component** ✅

Updated all examples to use correct shadcn component imports:

```typescript
import { Card } from '~/components/ui/card';
import { Button } from '~/components/ui/button';
import { ThemeIconButton } from '~/components/Theme';

export function ThemeIconButtonShowcase() {
  return (
    <>
      {/* Card from shadcn ui */}
      <Card className="p-6">
        <h2>Available Sizes</h2>
        <ThemeIconButton size="icon-xs" />
        <ThemeIconButton size="icon-sm" />
        <ThemeIconButton size="icon" />
        <ThemeIconButton size="icon-lg" />
      </Card>
    </>
  );
}
```

---

## shadcn Components Used

### Button Component

**Location**: `app/components/ui/button.tsx`

**Variants Available**:

- `default` - Primary button
- `outline` - Outlined button
- `ghost` - Ghost (transparent) button
- `secondary` - Secondary button
- `destructive` - Destructive/danger button
- `link` - Link-style button

**Sizes Available**:

- `default` - Default size (h-8)
- `xs` - Extra small (h-6)
- `sm` - Small (h-7)
- `lg` - Large (h-9)
- `icon` - Square icon button (size-8)
- `icon-xs` - Small icon button (size-6)
- `icon-sm` - Medium icon button (size-7)
- `icon-lg` - Large icon button (size-9)

**Example**:

```typescript
import { Button } from '~/components/ui/button';

<Button variant="ghost" size="icon">
  🌙
</Button>

<Button variant="outline" size="sm">
  Click me
</Button>
```

---

### Card Component

**Location**: `app/components/ui/card.tsx`

**Example**:

```typescript
import { Card } from '~/components/ui/card';

<Card className="p-6">
  <h2>Card Title</h2>
  <p>Card content</p>
</Card>
```

---

## Migration from Plain HTML

### Before (Plain HTML)

```typescript
<button className="p-2 hover:bg-muted rounded">
  🌙
</button>
```

### After (shadcn Button)

```typescript
import { Button } from '~/components/ui/button';

<Button variant="ghost" size="icon">
  🌙
</Button>
```

---

## Benefits

✅ **Consistency** - All buttons follow the same design system  
✅ **Theme Integration** - Buttons automatically respect current theme colors  
✅ **Accessibility** - Built-in ARIA labels and keyboard support  
✅ **Customization** - Easy to modify via variants and className  
✅ **Type Safety** - TypeScript support for props  
✅ **Responsive** - Proper mobile/desktop handling  
✅ **Focus Management** - Proper focus styles included  
✅ **States** - Hover, active, disabled states built-in

---

## Usage Pattern

### Standard Pattern

```typescript
import { Button } from '~/components/ui/button';
import { Card } from '~/components/ui/card';

export function MyComponent() {
  return (
    <Card className="p-6">
      <h2>My Feature</h2>

      {/* Use variant and size props */}
      <Button variant="default" size="sm">
        Primary Action
      </Button>

      <Button variant="outline" size="sm">
        Secondary Action
      </Button>

      <Button variant="ghost" size="icon">
        ⚙️
      </Button>
    </Card>
  );
}
```

---

## Common Customizations

### Custom Colors

```typescript
<Button variant="outline" className="text-blue-600 border-blue-200">
  Custom Button
</Button>
```

### Custom Sizing

```typescript
<Button className="px-6 py-3 text-lg">
  Large Button
</Button>
```

### Combined Props

```typescript
<Button
  variant="ghost"
  size="icon"
  className="rounded-full"
>
  👤
</Button>
```

---

## All Theme Exports

```typescript
// Theme Icon Buttons (all use shadcn Button internally)
import {
  ThemeIconButton,
  ThemeIconButtonWithText,
  ThemeIconButtonGhost,
  ThemeIconButtonOutline,
} from '~/components/Theme';

// Theme Utilities
import {
  useTheme,
  useThemeVariant,
  useThemeColors,
  useIsDarkTheme,
  useThemeToggle,
} from '~/components/Theme';

// Theme Config
import { THEME_VARIANTS, getThemeVariant, getAllThemes } from '~/components/Theme';

// shadcn Components
import { Button } from '~/components/ui/button';
import { Card } from '~/components/ui/card';
import { Input } from '~/components/ui/input';
import { Select } from '~/components/ui/select';
// ... all other shadcn components
```

---

## Component Hierarchy

```
TopNavigation (uses shadcn Button)
├── Menu Button (Button with ghost variant)
├── Notification Button (Button with ghost variant)
├── Theme Toggle (ThemeIconButton → Button with ghost)
└── User Menu
    ├── User Button (Button with ghost variant)
    └── Logout Button (Button with ghost variant)

ThemeExample (uses shadcn Button + Card)
├── Toggle Button (Button with default variant)
├── Selector Button (Button with outline variant)
├── Theme Cards (Card components)
└── Component Showcase (Button demos)

ThemeSwitcher (uses shadcn Button)
├── Theme Option Buttons (Button with variant based on selection)
└── Color Previews
```

---

## File Locations

| Component               | File                                               | Uses                 |
| ----------------------- | -------------------------------------------------- | -------------------- |
| ThemeIconButton         | `app/components/Theme/ThemeIconButton.tsx`         | shadcn Button        |
| TopNavigation           | `app/components/Layout/Primary/TopNavigation.tsx`  | shadcn Button        |
| ThemeSwitcher           | `app/components/Theme/ThemeSwitcher.tsx`           | shadcn Button        |
| ThemeExample            | `app/components/Theme/ThemeExample.tsx`            | shadcn Button + Card |
| ThemeIconButtonShowcase | `app/components/Theme/ThemeIconButtonShowcase.tsx` | shadcn Button + Card |

---

## Next Steps

1. ✅ All theme components refactored
2. ✅ Using shadcn Button throughout
3. ✅ Using shadcn Card for content
4. ⏭️ Consider using shadcn Select for theme dropdown
5. ⏭️ Add more shadcn components as needed

---

## Troubleshooting

### Button Not Styling Correctly

- Check that you're importing from `~/components/ui/button`
- Verify the variant and size props match available options
- Check if custom className is conflicting

### Theme Not Applying to Button

- Ensure ThemeProvider wraps your component
- Verify theme colors are correctly defined
- Check browser console for CSS variable errors

### Button Sizes Not Right

- Use shadcn Button sizes: `icon`, `icon-sm`, `icon-xs`, `icon-lg`
- Or use custom className for custom sizing
- Refer to shadcn Button documentation for all size options

---

## Related Documentation

- [THEME_SYSTEM_GUIDE.md](./THEME_SYSTEM_GUIDE.md) - Complete theme system
- [THEME_QUICK_START.md](./THEME_QUICK_START.md) - Quick start guide
- [THEME_ICON_BUTTON_GUIDE.md](./THEME_ICON_BUTTON_GUIDE.md) - Icon button variants

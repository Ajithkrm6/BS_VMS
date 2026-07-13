# Theme Icon Button Variants

## Overview

New button variant components for theme switching with multiple styles to fit any design context.

---

## Available Variants

### 1. **Standard Icon Button** (Default)

```typescript
import { ThemeIconButton } from '~/components/Theme';

<ThemeIconButton />
```

- **Features**: Icon with tooltip, smooth hover effects
- **Best for**: Headers, navbars, general purpose
- **Sizes**: `sm` | `md` (default) | `lg`

```typescript
<ThemeIconButton size="sm" />
<ThemeIconButton size="md" />
<ThemeIconButton size="lg" />
```

---

### 2. **With Text Label**

```typescript
import { ThemeIconButtonWithText } from '~/components/Theme';

<ThemeIconButtonWithText />
```

- **Features**: Icon + text label
- **Best for**: Settings pages, menus, prominent placement
- **Output**: Shows "Light Mode" or "Dark Mode"

---

### 3. **Ghost Variant** (Minimal)

```typescript
import { ThemeIconButtonGhost } from '~/components/Theme';

<ThemeIconButtonGhost />
```

- **Features**: Minimal styling, subtle hover
- **Best for**: Compact layouts, toolbars, tool collections
- **Style**: No border, subtle background on hover

---

### 4. **Outline Variant** (Bordered)

```typescript
import { ThemeIconButtonOutline } from '~/components/Theme';

<ThemeIconButtonOutline />
```

- **Features**: Border style, prominent
- **Best for**: Standalone buttons, button groups
- **Style**: Border with hover highlight

---

## Usage Examples

### Example 1: In Header (Currently Implemented)

```typescript
import { ThemeIconButton } from '~/components/Theme';

export function TopNavigation() {
  return (
    <header className="flex justify-between items-center">
      <Logo />
      <div className="flex gap-2">
        <ThemeIconButton />  {/* Sun/Moon icon with tooltip */}
      </div>
    </header>
  );
}
```

### Example 2: In Settings Page

```typescript
import { ThemeIconButtonWithText } from '~/components/Theme';

export function SettingsPage() {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <label>Appearance</label>
        <ThemeIconButtonWithText />
      </div>
    </div>
  );
}
```

### Example 3: In Toolbar/Compact Area

```typescript
import { ThemeIconButtonGhost } from '~/components/Theme';

export function Toolbar() {
  return (
    <div className="flex gap-1 p-2">
      <ThemeIconButtonGhost />
      <ThemeIconButtonGhost />
      <ThemeIconButtonGhost />
    </div>
  );
}
```

### Example 4: Button Group

```typescript
import { ThemeIconButtonOutline } from '~/components/Theme';

export function ButtonGroup() {
  return (
    <div className="flex gap-2">
      <button className="px-4 py-2 border rounded">Save</button>
      <ThemeIconButtonOutline />
      <button className="px-4 py-2 border rounded">Cancel</button>
    </div>
  );
}
```

---

## Customization

### Custom Styling with className

```typescript
{/* Custom text color */}
<ThemeIconButton className="text-blue-600" />

{/* Custom padding */}
<ThemeIconButton className="p-4" />

{/* Custom border */}
<ThemeIconButtonOutline className="border-2 border-primary" />

{/* Combine multiple */}
<ThemeIconButton className="p-3 text-lg" size="lg" />
```

---

## Props Reference

```typescript
// ThemeIconButton
interface ThemeIconButtonProps {
  showLabel?: boolean; // Show text label (default: false)
  className?: string; // Custom Tailwind classes
  size?: 'sm' | 'md' | 'lg'; // Button size (default: 'md')
}

// ThemeIconButtonWithText
interface ThemeIconButtonWithTextProps {
  className?: string; // Custom Tailwind classes
}

// ThemeIconButtonGhost
interface ThemeIconButtonGhostProps {
  className?: string; // Custom Tailwind classes
}

// ThemeIconButtonOutline
interface ThemeIconButtonOutlineProps {
  className?: string; // Custom Tailwind classes
}
```

---

## Features

✅ **Automatic Light/Dark Detection** - Switches icon based on current theme  
✅ **Smooth Transitions** - Icon animations on hover  
✅ **Accessible** - ARIA labels, keyboard accessible  
✅ **Tooltips** - Shows mode on hover  
✅ **Responsive** - Works on mobile and desktop  
✅ **Customizable** - Tailwind className support  
✅ **Multiple Sizes** - sm, md, lg options  
✅ **Theme Aware** - Uses theme colors automatically

---

## Icon Behavior

### Icons by Mode

| Current Theme            | Icon    | Tooltip |
| ------------------------ | ------- | ------- |
| Light/Brand/Ocean/Sunset | 🌙 Moon | "Dark"  |
| Dark/High Contrast Dark  | ☀️ Sun  | "Light" |

### Animations

- **Standard**: Icon rotates 12° on hover
- **Ghost**: Subtle opacity change
- **Outline**: Border highlights on hover
- **With Text**: Smooth transitions

---

## Integration Checklist

✅ TopNavigation - Standard ThemeIconButton added  
✅ 4 button variants created  
✅ Showcase component available  
✅ Full documentation provided

---

## Next Steps

1. **View Showcase** - See all variants: `<ThemeIconButtonShowcase />`
2. **Add to Components** - Use in your pages
3. **Customize** - Modify with className and size
4. **Extend** - Create more variants if needed

---

## All Variants in One Place

```typescript
import {
  ThemeIconButton,           // Standard (recommended)
  ThemeIconButtonWithText,   // With label
  ThemeIconButtonGhost,      // Minimal
  ThemeIconButtonOutline,    // Bordered
} from '~/components/Theme';

// Use anywhere
<ThemeIconButton />
<ThemeIconButtonWithText />
<ThemeIconButtonGhost />
<ThemeIconButtonOutline />
```

---

## Where to Use Each

| Component                 | Best Location      | Reason                       |
| ------------------------- | ------------------ | ---------------------------- |
| `ThemeIconButton`         | Headers, Navbars   | Standard, works everywhere   |
| `ThemeIconButtonWithText` | Settings, Menus    | Clear intent with label      |
| `ThemeIconButtonGhost`    | Toolbars, Compact  | Minimal, space efficient     |
| `ThemeIconButtonOutline`  | Standalone Buttons | Prominent, clear interaction |

---

Done! Your header now has a beautiful theme toggle button, and you have 4 variants available for use throughout your app. 🎨

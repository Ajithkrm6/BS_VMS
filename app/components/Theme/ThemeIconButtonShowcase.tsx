/**
 * Theme Icon Button Variants Showcase
 * Demonstrates all available theme button styles using shadcn components
 */

import {
  ThemeIconButton,
  ThemeIconButtonWithText,
  ThemeIconButtonGhost,
  ThemeIconButtonOutline,
} from '~/components/Theme/ThemeIconButton';
import { Card } from '~/components/ui/card';
import { Button } from '~/components/ui/button';

/**
 * Showcase all theme button variants
 */
export function ThemeIconButtonShowcase() {
  return (
    <div className="space-y-8 p-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Theme Icon Button Variants</h1>
        <p className="text-muted-foreground">
          Different button styles for theme switching throughout your app
        </p>
      </div>

      {/* Standard */}
      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-6">Standard (Default)</h2>
        <div className="flex items-center gap-4 flex-wrap">
          <ThemeIconButton />
          <p className="text-sm text-muted-foreground">
            Icon with tooltip on hover - Perfect for headers/navbars
          </p>
        </div>
        <pre className="mt-4 p-3 bg-muted rounded text-sm overflow-x-auto">
          {`import { ThemeIconButton } from '~/components/Theme';

<ThemeIconButton />`}
        </pre>
      </Card>

      {/* Sizes */}
      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-6">Sizes</h2>
        <div className="flex items-center gap-8">
          <div className="flex flex-col items-center gap-2">
            <ThemeIconButton size="icon-xs" />
            <span className="text-xs text-muted-foreground">Extra Small</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <ThemeIconButton size="icon-sm" />
            <span className="text-xs text-muted-foreground">Small</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <ThemeIconButton size="icon" />
            <span className="text-xs text-muted-foreground">Medium (Default)</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <ThemeIconButton size="icon-lg" />
            <span className="text-xs text-muted-foreground">Large</span>
          </div>
        </div>
        <pre className="mt-4 p-3 bg-muted rounded text-sm overflow-x-auto">
          {`<ThemeIconButton size="icon-xs" />
<ThemeIconButton size="icon-sm" />
<ThemeIconButton size="icon" />       {/* Default */}
<ThemeIconButton size="icon-lg" />`}
        </pre>
      </Card>

      {/* With Text */}
      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-6">With Text Label</h2>
        <div className="flex items-center gap-4 flex-wrap">
          <ThemeIconButtonWithText />
          <p className="text-sm text-muted-foreground">
            Icon with text label - Great for settings pages
          </p>
        </div>
        <pre className="mt-4 p-3 bg-muted rounded text-sm overflow-x-auto">
          {`import { ThemeIconButtonWithText } from '~/components/Theme';

<ThemeIconButtonWithText />`}
        </pre>
      </Card>

      {/* Ghost */}
      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-6">Ghost Variant (Minimal)</h2>
        <div className="flex items-center gap-4 flex-wrap">
          <ThemeIconButtonGhost />
          <p className="text-sm text-muted-foreground">
            Minimal style - Perfect for compact layouts
          </p>
        </div>
        <pre className="mt-4 p-3 bg-muted rounded text-sm overflow-x-auto">
          {`import { ThemeIconButtonGhost } from '~/components/Theme';

<ThemeIconButtonGhost />`}
        </pre>
      </Card>

      {/* Outline */}
      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-6">Outline Variant</h2>
        <div className="flex items-center gap-4 flex-wrap">
          <ThemeIconButtonOutline />
          <p className="text-sm text-muted-foreground">
            Bordered style - Good for standalone buttons
          </p>
        </div>
        <pre className="mt-4 p-3 bg-muted rounded text-sm overflow-x-auto">
          {`import { ThemeIconButtonOutline } from '~/components/Theme';

<ThemeIconButtonOutline />`}
        </pre>
      </Card>

      {/* All Together */}
      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-6">All Variants Comparison</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="flex flex-col items-center gap-3">
            <ThemeIconButton />
            <span className="text-xs text-muted-foreground text-center">Standard</span>
          </div>
          <div className="flex flex-col items-center gap-3">
            <ThemeIconButtonWithText />
            <span className="text-xs text-muted-foreground text-center">With Text</span>
          </div>
          <div className="flex flex-col items-center gap-3">
            <ThemeIconButtonGhost />
            <span className="text-xs text-muted-foreground text-center">Ghost</span>
          </div>
          <div className="flex flex-col items-center gap-3">
            <ThemeIconButtonOutline />
            <span className="text-xs text-muted-foreground text-center">Outline</span>
          </div>
        </div>
      </Card>

      {/* Real World Examples */}
      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-6">Real-World Usage Examples</h2>
        <div className="space-y-6">
          {/* Header Example */}
          <div>
            <h3 className="font-semibold mb-3">In Header/Navbar</h3>
            <div className="border border-border rounded-lg p-4 bg-muted/50">
              <div className="flex items-center justify-between">
                <span className="font-semibold">App Logo</span>
                <div className="flex gap-2">
                  <button className="p-2 hover:bg-muted rounded">🔔</button>
                  <ThemeIconButton />
                  <button className="p-2 hover:bg-muted rounded">👤</button>
                </div>
              </div>
            </div>
            <pre className="mt-2 p-3 bg-background rounded text-xs overflow-x-auto">
              {`<header className="flex justify-between items-center">
  <Logo />
  <div className="flex gap-2">
    <NotificationButton />
    <ThemeIconButton />
    <UserMenu />
  </div>
</header>`}
            </pre>
          </div>

          {/* Settings Example */}
          <div>
            <h3 className="font-semibold mb-3">In Settings Panel</h3>
            <div className="border border-border rounded-lg p-4 bg-muted/50 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm">Dark Mode</span>
                <ThemeIconButtonWithText />
              </div>
            </div>
            <pre className="mt-2 p-3 bg-background rounded text-xs overflow-x-auto">
              {`<div className="flex justify-between items-center">
  <label>Dark Mode</label>
  <ThemeIconButtonWithText />
</div>`}
            </pre>
          </div>

          {/* Compact Example */}
          <div>
            <h3 className="font-semibold mb-3">In Compact Layout (Ghost)</h3>
            <div className="border border-border rounded-lg p-2 bg-muted/50">
              <div className="flex gap-1">
                <ThemeIconButtonGhost />
                <ThemeIconButtonGhost />
                <ThemeIconButtonGhost />
              </div>
            </div>
            <pre className="mt-2 p-3 bg-background rounded text-xs overflow-x-auto">
              {`<div className="flex gap-1">
  <ThemeIconButtonGhost />
  <ThemeIconButtonGhost />
  <ThemeIconButtonGhost />
</div>`}
            </pre>
          </div>
        </div>
      </Card>

      {/* Customization */}
      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-6">Customization with className</h2>
        <div className="space-y-4">
          <div>
            <p className="text-sm text-muted-foreground mb-2">Custom Colors</p>
            <ThemeIconButton className="text-blue-600" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-2">Custom Padding</p>
            <ThemeIconButton className="p-4" />
          </div>
          <pre className="p-3 bg-muted rounded text-sm overflow-x-auto">
            {`{/* Add custom Tailwind classes */}
<ThemeIconButton className="text-blue-600" />
<ThemeIconButton className="p-4" />
<ThemeIconButton className="rounded-full border-2" />`}
          </pre>
        </div>
      </Card>

      {/* Props Reference */}
      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-6">Props Reference</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-2 px-3 font-semibold">Component</th>
                <th className="text-left py-2 px-3 font-semibold">Props</th>
                <th className="text-left py-2 px-3 font-semibold">Use Case</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-border">
                <td className="py-2 px-3">
                  <code className="bg-muted px-2 py-1 rounded text-xs">ThemeIconButton</code>
                </td>
                <td className="py-2 px-3">
                  <code className="text-xs">size, className</code>
                </td>
                <td className="py-2 px-3">Headers, navbars, standard placement</td>
              </tr>
              <tr className="border-b border-border">
                <td className="py-2 px-3">
                  <code className="bg-muted px-2 py-1 rounded text-xs">
                    ThemeIconButtonWithText
                  </code>
                </td>
                <td className="py-2 px-3">
                  <code className="text-xs">className</code>
                </td>
                <td className="py-2 px-3">Settings pages, menus</td>
              </tr>
              <tr className="border-b border-border">
                <td className="py-2 px-3">
                  <code className="bg-muted px-2 py-1 rounded text-xs">ThemeIconButtonGhost</code>
                </td>
                <td className="py-2 px-3">
                  <code className="text-xs">className</code>
                </td>
                <td className="py-2 px-3">Compact layouts, toolbars</td>
              </tr>
              <tr>
                <td className="py-2 px-3">
                  <code className="bg-muted px-2 py-1 rounded text-xs">ThemeIconButtonOutline</code>
                </td>
                <td className="py-2 px-3">
                  <code className="text-xs">className</code>
                </td>
                <td className="py-2 px-3">Standalone buttons, prominent placement</td>
              </tr>
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

export default ThemeIconButtonShowcase;

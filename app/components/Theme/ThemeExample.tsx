/**
 * Theme System Example Component
 * Complete working example showing all theme features using shadcn components
 */

import { useTheme, ThemeSwitcher, ThemeToggle } from '~/components/Theme';
import { Card } from '~/components/ui/card';
import { Button } from '~/components/ui/button';

/**
 * ThemeExample - Comprehensive demonstration of theme system
 */
export function ThemeExample() {
  const {
    currentThemeId,
    currentTheme,
    isDark,
    allThemes,
    setTheme,
    toggleTheme,
    enableAutomatic,
    isAutomatic,
  } = useTheme();

  return (
    <div className="min-h-screen bg-background text-foreground p-8">
      {/* Header */}
      <div className="mb-12">
        <h1 className="text-4xl font-bold mb-2">Theme System Demo</h1>
        <p className="text-muted-foreground">
          Explore all available themes and customize your experience
        </p>
      </div>

      {/* Current Theme Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Current Theme</h2>
          <div className="space-y-3">
            <div>
              <p className="text-sm text-muted-foreground">Theme Name</p>
              <p className="text-lg font-medium">{currentTheme.name}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Theme ID</p>
              <p className="font-mono text-sm">{currentThemeId}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Mode</p>
              <p className="font-medium">{isDark ? '🌙 Dark' : '☀️ Light'}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Description</p>
              <p className="text-sm">{currentTheme.description}</p>
            </div>
          </div>
        </Card>

        {/* Color Palette */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Color Palette</h2>
          <div className="grid grid-cols-3 gap-3">
            {Object.entries(currentTheme.colors).map(([colorName, colorValue]) => (
              <div key={colorName} className="text-center">
                <div
                  className="w-full h-16 rounded-lg border border-border mb-2"
                  style={{ backgroundColor: `hsl(${colorValue})` }}
                  title={`hsl(${colorValue})`}
                />
                <p className="text-xs font-mono truncate">{colorName}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
        <Button onClick={toggleTheme} variant="default" className="w-full">
          {isDark ? '☀️ Switch to Light' : '🌙 Switch to Dark'}
        </Button>
        <Button onClick={enableAutomatic} variant="outline" className="w-full">
          {isAutomatic ? '✓ Automatic' : 'Use System Preference'}
        </Button>
        <Button
          onClick={() => setTheme('light')}
          variant={currentThemeId === 'light' ? 'default' : 'outline'}
          className="w-full"
        >
          Light Theme
        </Button>
      </div>

      {/* Theme Switcher Grid */}
      <Card className="p-6 mb-12">
        <h2 className="text-xl font-semibold mb-6">Select a Theme</h2>
        <ThemeSwitcher showLabels={true} compact={false} />
      </Card>

      {/* Theme Details */}
      <Card className="p-6 mb-12">
        <h2 className="text-xl font-semibold mb-6">All Available Themes</h2>
        <div className="space-y-4">
          {allThemes.map((theme) => (
            <Button
              key={theme.id}
              onClick={() => setTheme(theme.id)}
              variant={currentThemeId === theme.id ? 'default' : 'outline'}
              className="w-full h-auto p-4 justify-start"
            >
              <div className="flex items-start justify-between w-full">
                <div className="flex-1">
                  <h3 className="font-semibold text-lg">{theme.name}</h3>
                  <p className="text-sm text-muted-foreground">{theme.description}</p>
                  <div className="mt-2">
                    <p className="text-xs">{theme.isDark ? '🌙 Dark Theme' : '☀️ Light Theme'}</p>
                  </div>
                </div>
                <div className="flex gap-1 ml-4">
                  {Object.values(theme.colors)
                    .slice(0, 8)
                    .map((color, idx) => (
                      <div
                        key={idx}
                        className="w-8 h-8 rounded"
                        style={{ backgroundColor: `hsl(${color})` }}
                      />
                    ))}
                </div>
              </div>
            </Button>
          ))}
        </div>
      </Card>

      {/* Component Examples */}
      <Card className="p-6 mb-12">
        <h2 className="text-xl font-semibold mb-6">Component Examples</h2>
        <div className="space-y-8">
          {/* Example 1 */}
          <div>
            <h3 className="font-semibold mb-3">Theme Toggle Button</h3>
            <div className="flex gap-2">
              <ThemeToggle />
              <p className="text-sm text-muted-foreground">Click to toggle light/dark</p>
            </div>
          </div>

          {/* Example 2 */}
          <div>
            <h3 className="font-semibold mb-3">Custom Styled Box (Using Theme Colors)</h3>
            <div className="p-6 rounded-lg border-2 border-primary bg-primary/10">
              <p className="font-medium">This box uses theme colors</p>
              <p className="text-sm text-muted-foreground mt-2">
                Background: primary/10, Text: foreground
              </p>
            </div>
          </div>

          {/* Example 3 */}
          <div>
            <h3 className="font-semibold mb-3">Color State Display</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <div className="p-3 rounded bg-background border border-border">
                <p className="text-xs text-muted-foreground">Background</p>
              </div>
              <div className="p-3 rounded bg-primary text-primary-foreground">
                <p className="text-xs">Primary</p>
              </div>
              <div className="p-3 rounded bg-secondary text-secondary-foreground">
                <p className="text-xs">Secondary</p>
              </div>
              <div className="p-3 rounded bg-accent text-accent-foreground">
                <p className="text-xs">Accent</p>
              </div>
              <div className="p-3 rounded bg-destructive text-destructive-foreground">
                <p className="text-xs">Destructive</p>
              </div>
              <div className="p-3 rounded bg-muted text-muted-foreground">
                <p className="text-xs">Muted</p>
              </div>
              <div className="p-3 rounded bg-card text-card-foreground border border-border">
                <p className="text-xs">Card</p>
              </div>
              <div className="p-3 rounded bg-popover text-popover-foreground border border-border">
                <p className="text-xs">Popover</p>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Usage Info */}
      <Card className="p-6 bg-muted/50">
        <h2 className="text-xl font-semibold mb-4">How to Use Themes in Your Code</h2>
        <div className="space-y-4">
          <div>
            <p className="font-mono text-sm bg-background p-3 rounded border">
              import {'{ useTheme }'} from '~/hooks/useTheme';
              <br />
              <br />
              const {'{ currentTheme, setTheme, isDark }'} = useTheme();
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Available Hooks:</h3>
            <ul className="list-disc list-inside space-y-1 text-sm">
              <li>
                <code className="bg-background px-2 py-1 rounded">useTheme()</code> - Full theme
                management
              </li>
              <li>
                <code className="bg-background px-2 py-1 rounded">useThemeVariant()</code> - Get
                current theme
              </li>
              <li>
                <code className="bg-background px-2 py-1 rounded">useThemeColors()</code> - Get
                colors
              </li>
              <li>
                <code className="bg-background px-2 py-1 rounded">useIsDarkTheme()</code> - Check if
                dark
              </li>
              <li>
                <code className="bg-background px-2 py-1 rounded">useThemeToggle()</code> - Simple
                toggle
              </li>
            </ul>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default ThemeExample;

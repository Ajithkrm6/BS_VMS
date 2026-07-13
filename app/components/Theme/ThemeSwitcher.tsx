/**
 * Theme Switcher Component
 * Displays all available themes and allows users to switch between them using shadcn components
 */

import { useTheme } from '~/hooks/useTheme';
import { Card } from '~/components/ui/card';
import { Button } from '~/components/ui/button';

interface ThemeSwitcherProps {
  showLabels?: boolean;
  compact?: boolean;
}

/**
 * ThemeSwitcher Component
 * Displays theme options with preview using shadcn Button
 */
export function ThemeSwitcher({ showLabels = true, compact = false }: ThemeSwitcherProps) {
  const { currentThemeId, setTheme, allThemes } = useTheme();

  return (
    <div className={`flex flex-wrap gap-${compact ? '2' : '4'}`}>
      {allThemes.map((theme) => (
        <Button
          key={theme.id}
          onClick={() => setTheme(theme.id)}
          variant={currentThemeId === theme.id ? 'default' : 'outline'}
          className={`flex flex-col items-center gap-2 p-${compact ? '2' : '4'} h-auto transition-all ${
            currentThemeId === theme.id ? 'ring-2 ring-offset-2' : 'hover:border-primary'
          }`}
          title={theme.description}
        >
          {/* Color preview */}
          <div className="flex gap-1">
            {Object.values(theme.colors)
              .slice(0, 5)
              .map((color, idx) => (
                <div
                  key={idx}
                  className="w-4 h-4 rounded"
                  style={{ backgroundColor: `hsl(${color})` }}
                />
              ))}
          </div>

          {showLabels && (
            <div className="text-center">
              <p className="text-sm font-medium">{theme.name}</p>
              {!compact && <p className="text-xs text-muted-foreground">{theme.description}</p>}
            </div>
          )}
        </Button>
      ))}
    </div>
  );
}

/**
 * Simple Dark/Light Toggle using shadcn Button
 */
export function ThemeToggle() {
  const { isDark, toggleTheme, canToggle } = useTheme();

  if (!canToggle) {
    return null; // Hide toggle for non-light/dark themes
  }

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={toggleTheme}
      title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {isDark ? (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 3v1m0 16v1m9-9h-1m-16 0H1m15.657 5.657l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ) : (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
      )}
    </Button>
  );
}

/**
 * Dropdown Theme Selector using shadcn Select
 */
export function ThemeSelect() {
  const { currentThemeId, setTheme, allThemes } = useTheme();

  return (
    <select
      value={currentThemeId}
      onChange={(e) => setTheme(e.target.value)}
      className="px-3 py-2 rounded-lg border border-input bg-background text-foreground transition-colors hover:bg-muted focus:outline-none focus:ring-2 focus:ring-primary"
    >
      {allThemes.map((theme) => (
        <option key={theme.id} value={theme.id}>
          {theme.name}
        </option>
      ))}
    </select>
  );
}

/**
 * Theme Selector Modal/Card using shadcn components
 */
export function ThemeSelector() {
  const { currentThemeId, setTheme, allThemes } = useTheme();

  return (
    <Card className="p-6">
      <h2 className="text-lg font-semibold mb-4">Choose Theme</h2>
      <p className="text-sm text-muted-foreground mb-6">
        Select a theme to customize the appearance of the application
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {allThemes.map((theme) => (
          <Button
            key={theme.id}
            onClick={() => setTheme(theme.id)}
            variant={currentThemeId === theme.id ? 'default' : 'outline'}
            className="p-4 h-auto flex flex-col items-start gap-3 transition-all hover:border-primary"
          >
            {/* Color palette preview */}
            <div className="w-full flex gap-1">
              {Object.values(theme.colors)
                .slice(0, 6)
                .map((color, idx) => (
                  <div
                    key={idx}
                    className="flex-1 h-6 rounded"
                    style={{ backgroundColor: `hsl(${color})` }}
                  />
                ))}
            </div>

            <div className="w-full text-left">
              <p className="font-medium text-sm">{theme.name}</p>
              <p className="text-xs text-muted-foreground">{theme.description}</p>
              <p className="text-xs mt-2">{theme.isDark ? '🌙 Dark' : '☀️ Light'}</p>
            </div>
          </Button>
        ))}
      </div>
    </Card>
  );
}

export default ThemeSwitcher;

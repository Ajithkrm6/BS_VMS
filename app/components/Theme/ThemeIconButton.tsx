/**
 * Theme Icon Button Variant
 * Beautiful icon-style theme toggle button with hover effects using shadcn Button
 */

import { useTheme } from '~/hooks/useTheme';
import { Button } from '~/components/ui/button';

interface ThemeIconButtonProps {
  showLabel?: boolean;
  className?: string;
  size?: 'icon-xs' | 'icon-sm' | 'icon' | 'icon-lg';
}

/**
 * ThemeIconButton - Icon variant theme toggle using shadcn Button
 * Shows sun icon for light mode, moon icon for dark mode
 */
export function ThemeIconButton({
  showLabel = false,
  className = '',
  size = 'icon',
}: ThemeIconButtonProps) {
  const { isDark, toggleTheme } = useTheme();

  return (
    <Button
      variant="ghost"
      size={size}
      onClick={toggleTheme}
      title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
      className={`relative group transition-all duration-200 ${className}`}
      aria-label="Toggle theme"
    >
      <div
        className={`flex items-center justify-center transition-transform duration-300 ${showLabel ? 'mr-2' : ''}`}
      >
        {isDark ? (
          // Sun Icon (Light Mode)
          <svg
            className="w-full h-full transition-transform group-hover:rotate-12"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M12 3v1m0 16v1m9-9h-1m-16 0H1m15.657 5.657l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
        ) : (
          // Moon Icon (Dark Mode)
          <svg
            className="w-full h-full transition-transform group-hover:-rotate-12"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
          </svg>
        )}
      </div>

      {/* Tooltip */}
      <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-muted text-foreground text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none shadow-lg border border-border">
        {isDark ? '☀️ Light' : '🌙 Dark'}
      </span>

      {/* Label */}
      {showLabel && <span className="text-xs font-medium">{isDark ? 'Dark' : 'Light'}</span>}
    </Button>
  );
}

/**
 * ThemeIconButtonWithText - Icon + text variant using shadcn Button
 */
export function ThemeIconButtonWithText({ className = '' }: { className?: string }) {
  const { isDark, toggleTheme } = useTheme();

  return (
    <Button
      variant="outline"
      onClick={toggleTheme}
      className={`flex items-center gap-2 ${className}`}
    >
      <div className="w-5 h-5 flex items-center justify-center">
        {isDark ? (
          <svg className="w-full h-full" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 3v1m0 16v1m9-9h-1m-16 0H1m15.657 5.657l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
        ) : (
          <svg className="w-full h-full" fill="currentColor" viewBox="0 0 24 24">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
          </svg>
        )}
      </div>
      <span className="text-sm font-medium">{isDark ? 'Light Mode' : 'Dark Mode'}</span>
    </Button>
  );
}

/**
 * ThemeIconButtonGhost - Minimal ghost style using shadcn Button
 */
export function ThemeIconButtonGhost({ className = '' }: { className?: string }) {
  const { isDark, toggleTheme } = useTheme();

  return (
    <Button
      variant="ghost"
      size="icon-sm"
      onClick={toggleTheme}
      className={`transition-colors duration-200 ${className}`}
      title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
    >
      <div className="w-full h-full flex items-center justify-center">
        {isDark ? (
          <svg className="w-full h-full" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 3v1m0 16v1m9-9h-1m-16 0H1m15.657 5.657l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
        ) : (
          <svg className="w-full h-full" fill="currentColor" viewBox="0 0 24 24">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
          </svg>
        )}
      </div>
    </Button>
  );
}

/**
 * ThemeIconButtonOutline - Outlined style variant using shadcn Button
 */
export function ThemeIconButtonOutline({ className = '' }: { className?: string }) {
  const { isDark, toggleTheme } = useTheme();

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={toggleTheme}
      className={`transition-colors ${className}`}
      title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
    >
      <div className="w-full h-full flex items-center justify-center">
        {isDark ? (
          <svg className="w-full h-full" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 3v1m0 16v1m9-9h-1m-16 0H1m15.657 5.657l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
        ) : (
          <svg className="w-full h-full" fill="#000000" viewBox="0 0 24 24">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
          </svg>
        )}
      </div>
    </Button>
  );
}

export default ThemeIconButton;

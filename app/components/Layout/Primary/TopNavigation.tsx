import { useState } from 'react';
import { useAuth } from '~/hooks/useAuth';
import { useTheme } from '~/hooks/useTheme';
import { Button } from '~/components/ui/button';
import { ThemeIconButton } from '~/components/Theme/ThemeIconButton';

interface TopNavigationProps {
  title?: string;
  onMenuToggle?: () => void;
}

export function TopNavigation({ title = 'BS-VMS', onMenuToggle }: TopNavigationProps) {
  const { user, logout } = useAuth();
  const [showUserMenu, setShowUserMenu] = useState(false);

  return (
    <header className="bg-card border-b border-border sticky top-0 z-40">
      <div className="flex items-center justify-between h-16 px-4 md:px-6">
        <div className="flex items-center gap-2 md:gap-4">
          <Button variant="ghost" size="icon" onClick={onMenuToggle} className="md:hidden">
            <span className="text-lg">☰</span>
          </Button>
          <h1 className="text-lg font-semibold truncate">{title}</h1>
        </div>

        <div className="flex items-center gap-2 md:gap-4">
          {/* Notification Button */}
          <Button variant="ghost" size="icon" className="transition-colors duration-200">
            <span className="text-lg md:text-xl">🔔</span>
          </Button>

          {/* Theme Toggle Button - shadcn Button */}
          <ThemeIconButton size="icon" />

          {/* User Menu */}
          <div className="relative">
            <Button
              variant="ghost"
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center gap-2"
            >
              <span className="text-lg md:text-xl">👤</span>
              <span className="hidden sm:inline text-sm font-medium truncate max-w-[100px]">
                {user?.name}
              </span>
            </Button>

            {/* Dropdown Menu */}
            {showUserMenu && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setShowUserMenu(false)} />
                <div className="absolute right-0 mt-2 w-48 bg-card border border-border rounded-lg shadow-lg z-50">
                  <div className="p-4 border-b border-border">
                    <p className="font-semibold text-sm">{user?.name}</p>
                    <p className="text-xs text-muted-foreground">{user?.email}</p>
                    <p className="text-xs text-muted-foreground mt-1 capitalize">
                      Role: {user?.role}
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    onClick={() => {
                      logout();
                      setShowUserMenu(false);
                    }}
                    className="w-full justify-start text-sm text-destructive hover:text-destructive hover:bg-destructive/10"
                  >
                    Logout
                  </Button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

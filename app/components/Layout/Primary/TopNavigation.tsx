import { useState } from 'react';
import { useAuth } from '~/hooks/useAuth';

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
          <button onClick={onMenuToggle} className="p-2 hover:bg-muted rounded md:hidden text-lg">
            ☰
          </button>
          <h1 className="text-lg font-semibold truncate">{title}</h1>
        </div>

        <div className="flex items-center gap-2 md:gap-4">
          <button className="p-2 hover:bg-muted rounded">
            <span className="text-lg md:text-xl">🔔</span>
          </button>

          {/* User Menu */}
          <div className="relative">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="p-2 hover:bg-muted rounded flex items-center gap-2"
            >
              <span className="text-lg md:text-xl">👤</span>
              <span className="hidden sm:inline text-sm font-medium truncate max-w-[100px]">
                {user?.name}
              </span>
            </button>

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
                  <button
                    onClick={() => {
                      logout();
                      setShowUserMenu(false);
                    }}
                    className="w-full text-left px-4 py-2 hover:bg-muted text-sm text-red-600 hover:text-red-700"
                  >
                    Logout
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

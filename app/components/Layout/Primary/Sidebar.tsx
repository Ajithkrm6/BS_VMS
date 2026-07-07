interface SidebarProps {
  isOpen?: boolean;
  onToggle?: () => void;
  showToggleButton?: boolean;
  isMobile?: boolean;
}

export function Sidebar({
  isOpen = true,
  onToggle,
  showToggleButton = true,
  isMobile = false,
}: SidebarProps) {
  const sidebarWidth = isOpen ? 'w-64' : 'w-20';
  const baseClasses = isMobile ? 'w-64' : sidebarWidth;

  return (
    <aside
      className={`${
        baseClasses
      } bg-card border-r border-border transition-all duration-300 ease-in-out h-screen overflow-y-auto`}
    >
      <nav className="p-4">
        <div className="flex items-center justify-between mb-8">
          <h1 className={`font-bold text-xl ${isOpen || isMobile ? 'block' : 'hidden'}`}>VMS</h1>
          {showToggleButton && (
            <button onClick={onToggle} className="p-2 hover:bg-muted rounded hidden md:block">
              ☰
            </button>
          )}
          {isMobile && (
            <button onClick={onToggle} className="p-2 hover:bg-muted rounded">
              ✕
            </button>
          )}
        </div>

        <ul className="space-y-2">
          <li>
            <a href="/" className="flex items-center p-3 hover:bg-muted rounded transition-colors">
              <span className="text-xl">🏠</span>
              {isOpen && <span className="ml-3">Dashboard</span>}
            </a>
          </li>
          <li>
            <a
              href="/opportunities"
              className="flex items-center p-3 hover:bg-muted rounded transition-colors"
            >
              <span className="text-xl">💼</span>
              {isOpen && <span className="ml-3">Opportunities</span>}
            </a>
          </li>
          <li>
            <a
              href="/bench"
              className="flex items-center p-3 hover:bg-muted rounded transition-colors"
            >
              <span className="text-xl">🔧</span>
              {isOpen && <span className="ml-3">Bench</span>}
            </a>
          </li>
          <li>
            <a
              href="/reports"
              className="flex items-center p-3 hover:bg-muted rounded transition-colors"
            >
              <span className="text-xl">📊</span>
              {isOpen && <span className="ml-3">Reports</span>}
            </a>
          </li>
        </ul>
      </nav>
    </aside>
  );
}

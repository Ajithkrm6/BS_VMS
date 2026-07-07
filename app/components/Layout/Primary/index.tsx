import { ReactNode, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { TopNavigation } from './TopNavigation';

interface LayoutPrimaryProps {
  children: ReactNode;
}

export function LayoutPrimary({ children }: LayoutPrimaryProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false); // Start closed on mobile
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false); // Collapsed state on desktop
  const location = useLocation();

  // Hide layout on auth page
  const isAuthPage = location.pathname === '/auth';

  if (isAuthPage) {
    return <>{children}</>;
  }

  return (
    <div className="flex h-screen bg-background">
      {/* Desktop Sidebar */}
      <div className="hidden md:block">
        <Sidebar
          isOpen={!sidebarCollapsed}
          onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
          showToggleButton
        />
      </div>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
            onClick={() => setSidebarOpen(false)}
          />
          {/* Sidebar */}
          <div className="fixed left-0 top-0 h-screen z-40 md:hidden">
            <Sidebar
              isOpen={true}
              onToggle={() => setSidebarOpen(false)}
              showToggleButton={false}
              isMobile
            />
          </div>
        </>
      )}

      <div className="flex-1 flex flex-col overflow-hidden">
        <TopNavigation onMenuToggle={() => setSidebarOpen(!sidebarOpen)} />
        <main className="flex-1 overflow-auto">
          <div className="container mx-auto py-6">{children}</div>
        </main>
      </div>
    </div>
  );
}

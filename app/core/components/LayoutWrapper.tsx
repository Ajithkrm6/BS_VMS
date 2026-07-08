/**
 * Layout Wrapper
 * Automatically protects routes and shows sidebar + topnav
 *
 * Any route rendered inside this wrapper is automatically protected.
 * If user is not authenticated, they're redirected to login.
 */

import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from '~/stores';
import { LayoutPrimary } from '~/components/Layout/Primary';

export function LayoutWrapper() {
  // Get auth state from Redux
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  // Not logged in? → Redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Logged in → Show layout with content
  return (
    <LayoutPrimary>
      <Outlet />
    </LayoutPrimary>
  );
}

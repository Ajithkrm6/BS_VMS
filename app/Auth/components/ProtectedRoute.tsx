import { Navigate } from 'react-router-dom';
import { useAuth } from '~/hooks/useAuth';
import { LoadingSpinner } from '~/components/Layout/Utility/LoadingSpinner';
import type { UserRole } from '~/types/auth';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRoles?: UserRole[];
}

/**
 * ProtectedRoute Component
 * Wraps routes that require authentication
 *
 * If user is not authenticated:
 *   → Redirect to /auth
 *
 * If user is authenticated but doesn't have required role:
 *   → Show access denied message
 *
 * If user is authenticated with correct role:
 *   → Show children
 */
export function ProtectedRoute({ children, requiredRoles }: ProtectedRouteProps) {
  const { isAuthenticated, isLoading, user } = useAuth();

  // Show loading while checking session
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <LoadingSpinner />
      </div>
    );
  }

  // If not authenticated, redirect to auth page
  if (!isAuthenticated) {
    return <Navigate to="/auth" replace />;
  }

  // If required roles specified, check if user has one
  if (requiredRoles && user && !requiredRoles.includes(user.role)) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Access Denied</h1>
          <p className="text-gray-600 mb-6">You don't have permission to access this page.</p>
          <p className="text-sm text-gray-500">Your role: {user.role}</p>
          <p className="text-sm text-gray-500">Required roles: {requiredRoles.join(', ')}</p>
        </div>
      </div>
    );
  }

  // User is authenticated and has required role
  return <>{children}</>;
}

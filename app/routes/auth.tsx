import { AuthPage } from '~/Auth/Pages/AuthPage';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '~/hooks/useAuth';
import { useEffect } from 'react';

/**
 * Auth Route
 * Shows login/register page
 * Redirects to home if already authenticated
 */
export function AuthRoute() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  // Redirect to home if already logged in
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  return (
    <AuthPage
      onAuthSuccess={() => {
        navigate('/', { replace: true });
      }}
    />
  );
}

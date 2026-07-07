import { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '~/stores';
import { loginUser, registerUser, logoutUser, clearError } from '~/stores/authSlice';

/**
 * Custom hook for authentication
 * Provides easy access to auth state and actions
 */
export function useAuth() {
  const dispatch = useAppDispatch();

  // Get auth state
  const user = useAppSelector((state) => state.auth.user);
  const token = useAppSelector((state) => state.auth.token);
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  const isLoading = useAppSelector((state) => state.auth.isLoading);
  const error = useAppSelector((state) => state.auth.error);

  // Login handler
  const login = useCallback(
    async (email: string, password: string) => {
      return dispatch(loginUser({ email, password }));
    },
    [dispatch]
  );

  // Register handler
  const register = useCallback(
    async (
      email: string,
      password: string,
      name: string,
      role: 'vendor' | 'customer' | 'admin',
      company?: string,
      phone?: string
    ) => {
      return dispatch(registerUser({ email, password, name, role, company, phone }));
    },
    [dispatch]
  );

  // Logout handler
  const logout = useCallback(() => {
    if (token) {
      dispatch(logoutUser(token));
    }
  }, [dispatch, token]);

  // Clear error
  const handleClearError = useCallback(() => {
    dispatch(clearError());
  }, [dispatch]);

  // Check if user has specific role
  const hasRole = useCallback(
    (role: string | string[]) => {
      if (!user) return false;
      if (typeof role === 'string') {
        return user.role === role;
      }
      return role.includes(user.role);
    },
    [user]
  );

  return {
    // State
    user,
    token,
    isAuthenticated,
    isLoading,
    error,

    // Actions
    login,
    register,
    logout,
    clearError: handleClearError,

    // Helpers
    hasRole,
    isVendor: user?.role === 'vendor',
    isCustomer: user?.role === 'customer',
    isAdmin: user?.role === 'admin',
  };
}

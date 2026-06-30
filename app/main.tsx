import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { QueryClientProvider } from '@tanstack/react-query';
import { store } from '~/stores';
import { queryClient } from '~/services/queryClient';
import { Layout } from '~/root';
import { ErrorBoundary } from '~/components/Layout/Utility/ErrorBoundary';
import { ProtectedRoute } from '~/components/Auth/ProtectedRoute';
import { useAppDispatch } from '~/stores';
import { validateSession } from '~/stores/authSlice';
import { Dashboard } from '~/routes';
import { AuthRoute } from '~/routes/auth';
import { Opportunity } from '~/routes/opportunity';
import { Bench } from '~/routes/bench';
import '~/root.css';

/**
 * App Initializer Component
 * Validates auth session on app load
 */
function AppInitializer({ children }: { children: React.ReactNode }) {
  const dispatch = useAppDispatch();
  const [initialized, setInitialized] = React.useState(false);

  useEffect(() => {
    const initializeApp = async () => {
      // Check if there's a saved token in localStorage
      const token = localStorage.getItem('auth_token');

      if (token) {
        try {
          // Validate token with backend
          await dispatch(validateSession(token));
        } catch (error) {
          console.log('Session validation failed, user needs to login');
          // Session is invalid, will redirect to auth
        }
      }

      setInitialized(true);
    };

    initializeApp();
  }, [dispatch]);

  // Wait for initialization before rendering routes
  if (!initialized) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ErrorBoundary>
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <BrowserRouter>
            <AppInitializer>
              <Layout>
                <Routes>
                  {/* Auth Route - Public */}
                  <Route path="/auth" element={<AuthRoute />} />

                  {/* Protected Routes */}
                  <Route
                    path="/"
                    element={
                      <ProtectedRoute>
                        <Dashboard />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/opportunities"
                    element={
                      <ProtectedRoute>
                        <Opportunity />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/bench"
                    element={
                      <ProtectedRoute>
                        <Bench />
                      </ProtectedRoute>
                    }
                  />
                </Routes>
              </Layout>
            </AppInitializer>
          </BrowserRouter>
        </QueryClientProvider>
      </Provider>
    </ErrorBoundary>
  </React.StrictMode>
);

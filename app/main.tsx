import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter, type RouteObject } from 'react-router-dom';
import { Provider as ReduxProvider } from 'react-redux';
import { QueryClientProvider } from '@tanstack/react-query';

// Module system
import { moduleRegistry } from '~/core/utils/moduleRegistry';
import { initializeModules } from '~/core/utils/moduleInitializer';
import { buildRoutesFromModules } from '~/core/utils/routeBuilder';
import { logDebugInfo, checkModules, checkRoutes } from '~/core/utils/debug';
import { ModuleProvider } from '~/core/components/ModuleProvider';

// Store & services
import { initializeStore, getStore } from '~/core/stores';
import { queryClient } from '~/services/queryClient';

// Components
import { ErrorBoundary } from '~/components/Layout/Utility/ErrorBoundary';

// Module configs
import { landingModuleConfig } from '~/modules/landing/module.config';
import authModuleConfig from '~/modules/auth/module.config';
import coreModuleConfig from '~/modules/core/module.config';
import opportunitiesModuleConfig from '~/modules/opportunities/module.config';
import vehiclesModuleConfig from '~/modules/vehicles/module.config';
import maintenanceModuleConfig from '~/modules/maintenance/module.config';
import reportingModuleConfig from '~/modules/reporting/module.config';
import notificationsModuleConfig from '~/modules/notifications/module.config';

// Styles
import '~/root.css';

/**
 * App Initializer Component
 * Initializes modules and validates auth session
 */
function AppInitializer({ children }: { children: React.ReactNode }) {
  const [initialized, setInitialized] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const initialize = async () => {
      try {
        console.group('🚀 App Initialization');

        // Step 1: Register all module configs (only if not already registered)
        console.info('📦 Registering modules...');
        const existingModules = moduleRegistry.getAllModules();

        if (existingModules.size === 0) {
          moduleRegistry.registerModules([
            landingModuleConfig, // Public pages (no auth required)
            authModuleConfig, // Auth pages (login, register)
            coreModuleConfig, // Dashboard
            opportunitiesModuleConfig, // Protected feature
            vehiclesModuleConfig, // Protected feature
            maintenanceModuleConfig, // Protected feature
            reportingModuleConfig, // Protected feature
            notificationsModuleConfig, // Protected feature
          ]);
          console.info('✓ Modules registered:', Array.from(moduleRegistry.getAllModules().keys()));
        } else {
          console.info('✓ Modules already registered:', Array.from(existingModules.keys()));
        }

        // Step 2: Initialize modules (loads based on feature flags)
        console.info('⚙️ Initializing modules...');
        const loadedModules = await initializeModules({
          onModuleLoaded: (moduleId) => {
            console.info(`  ✓ Module "${moduleId}" loaded`);
          },
          onModuleLoadError: (moduleId, error) => {
            console.error(`  ✗ Failed to load module "${moduleId}": ${error.message}`);
          },
        });

        console.info(`✓ Initialization complete. Loaded: ${Array.from(loadedModules).join(', ')}`);

        // Step 3: Initialize Redux store with module reducers (only if not already initialized)
        console.info('📊 Creating Redux store...');
        try {
          getStore();
          console.info('✓ Redux store already initialized');
        } catch {
          initializeStore();
          console.info('✓ Redux store initialized');
        }

        // Step 4: Log detailed debug info
        logDebugInfo();

        console.info('✓ App initialization completed successfully');
        console.groupEnd();

        setInitialized(true);
      } catch (err) {
        const error = err instanceof Error ? err : new Error(String(err));
        console.error('✗ Failed to initialize app:', error);
        console.groupEnd();
        setError(error);
      }
    };

    initialize();
  }, []);

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-red-50">
        <div className="text-center p-8 bg-white rounded-lg shadow-lg">
          <h1 className="text-2xl font-bold text-red-700 mb-2">Initialization Error</h1>
          <p className="text-red-600 mb-4">{error.message}</p>
          <p className="text-sm text-gray-600">Check the console for more details</p>
        </div>
      </div>
    );
  }

  if (!initialized) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Initializing application...</p>
          <p className="text-sm text-gray-500 mt-2">Loading modules and features...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}

/**
 * App Component
 * Builds routes dynamically from modules and renders router
 */
function App() {
  const [router, setRouter] = useState<ReturnType<typeof createBrowserRouter> | null>(null);
  const [routeError, setRouteError] = useState<string | null>(null);

  useEffect(() => {
    try {
      console.group('🛣️ Route Building');

      // Check modules
      const moduleStatus = checkModules();
      console.info(`📦 Modules: ${moduleStatus.loaded}/${moduleStatus.total} loaded`);
      if (moduleStatus.missingModules.length > 0) {
        console.warn('⚠️ Missing modules:', moduleStatus.missingModules);
      }

      // Build routes from loaded modules
      const moduleRoutes = buildRoutesFromModules();
      console.info(`✓ Built ${moduleRoutes.length} routes from modules:`, moduleRoutes);

      if (moduleRoutes.length === 0) {
        console.warn('⚠️ No routes found. Checking what went wrong...');
        const routeStatus = checkRoutes();
        console.warn('Route status:', routeStatus);
        setRouteError('No routes found. Check module configuration and console logs.');
        console.groupEnd();
        return;
      }

      // Add 404 fallback and error handling
      const routes: RouteObject[] = [
        ...moduleRoutes,
        // 404 fallback
        {
          path: '*',
          element: (
            <div className="flex items-center justify-center min-h-screen">
              <div className="text-center">
                <h1 className="text-4xl font-bold text-gray-800 mb-4">404</h1>
                <p className="text-gray-600 mb-8">Page not found</p>
                <a href="/" className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
                  Go Home
                </a>
              </div>
            </div>
          ),
        },
      ];

      console.info('✓ Routes configured with 404 fallback');

      // Create router
      const newRouter = createBrowserRouter(routes);
      console.info('✓ Router created successfully');
      console.groupEnd();

      setRouter(newRouter);
    } catch (error) {
      const err = error instanceof Error ? error : new Error(String(error));
      console.error('✗ Failed to build routes:', err);
      console.groupEnd();
      setRouteError(err.message);
    }
  }, []);

  if (routeError) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-red-50">
        <div className="text-center p-8 bg-white rounded-lg shadow-lg max-w-md">
          <h1 className="text-2xl font-bold text-red-700 mb-2">Router Configuration Error</h1>
          <p className="text-red-600 mb-4">{routeError}</p>
          <p className="text-sm text-gray-600 mb-4">Check the console for more details</p>
        </div>
      </div>
    );
  }

  if (!router) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Building routes...</p>
          <p className="text-sm text-gray-500 mt-2">Setting up module routes...</p>
        </div>
      </div>
    );
  }

  console.info('✓ Rendering app with configured router');
  return <RouterProvider router={router} />;
}

/**
 * App Content Component
 * Contains Redux providers and app content
 * Must be rendered INSIDE AppInitializer after store is initialized
 */
function AppContent() {
  const store = getStore();

  return (
    <ReduxProvider store={store}>
      <QueryClientProvider client={queryClient}>
        <ModuleProvider>
          <App />
        </ModuleProvider>
      </QueryClientProvider>
    </ReduxProvider>
  );
}

/**
 * Root Component
 * Wraps everything with error boundary
 */
function Root() {
  return (
    <React.StrictMode>
      <ErrorBoundary>
        <AppInitializer>
          <AppContent />
        </AppInitializer>
      </ErrorBoundary>
    </React.StrictMode>
  );
}

// Render
ReactDOM.createRoot(document.getElementById('root')!).render(<Root />);

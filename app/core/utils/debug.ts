/**
 * Debug utilities for troubleshooting
 */

import { moduleRegistry } from './moduleRegistry';

/**
 * Log detailed debug info to console
 */
export function logDebugInfo(): void {
  console.group('🔍 Module System Debug Info');

  // Registered modules
  const allModules = moduleRegistry.getAllModules();
  console.info('📦 All registered modules:', Array.from(allModules.keys()));

  // Loaded modules
  const loadedModules = moduleRegistry.getLoadedModules();
  console.info('✅ Loaded modules:', Array.from(loadedModules));

  // Routes
  const routes = moduleRegistry.getRoutes();
  console.info('🛣️ Routes:', routes);
  console.table(routes.map((r) => ({ path: r.path, name: r.name })));

  // Reducers
  try {
    const reducers = moduleRegistry.getReducers();
    console.info('📊 Redux reducers:', Object.keys(reducers));
  } catch (error) {
    console.error('Error getting reducers:', error);
  }

  console.groupEnd();
}

/**
 * Check if routes are available
 */
export function checkRoutes(): { hasRoutes: boolean; routeCount: number; routes: string[] } {
  const routes = moduleRegistry.getRoutes();
  return {
    hasRoutes: routes.length > 0,
    routeCount: routes.length,
    routes: routes.map((r) => r.path),
  };
}

/**
 * Check if modules are loaded
 */
export function checkModules(): { loaded: number; total: number; missingModules: string[] } {
  const allModules = moduleRegistry.getAllModules();
  const loadedModules = moduleRegistry.getLoadedModules();
  const missingModules = Array.from(allModules.keys()).filter((key) => !loadedModules.has(key));

  return {
    loaded: loadedModules.size,
    total: allModules.size,
    missingModules,
  };
}

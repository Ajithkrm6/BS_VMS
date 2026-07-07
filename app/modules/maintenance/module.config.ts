/**
 * Vendor Tracking Module Configuration
 * Vendor performance and metrics tracking
 */

import type { ModuleConfig } from '~/utils/moduleRegistry';

export const vendorTrackingModuleConfig: ModuleConfig = {
  name: 'vendorTracking',
  version: '1.0.0',
  featureFlag: 'vendorTracking',
  description: 'Vendor performance tracking and metrics',
  dependencies: ['core', 'vendors'],
  routes: [
    // Routes will be added here
    // {
    //   path: '/maintenance',
    //   name: 'Maintenance',
    //   component: lazy(() => import('./pages/MaintenanceTracker')),
    //   icon: '🔧',
    //   order: 3,
    // }
  ],
  stores: [
    // Add Redux slices
    // {
    //   name: 'maintenance',
    //   reducer: maintenanceReducer,
    // }
  ],
  permissions: ['maintenance:read', 'maintenance:create', 'maintenance:update'],
};

export default vendorTrackingModuleConfig;

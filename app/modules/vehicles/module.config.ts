/**
 * Vendors Module Configuration
 * Vendor management feature
 */

import type { ModuleConfig } from '~/utils/moduleRegistry';

export const vendorsModuleConfig: ModuleConfig = {
  name: 'vendors',
  version: '1.0.0',
  featureFlag: 'vendorManagement',
  description: 'Vendor CRUD operations and management',
  dependencies: ['core'],
  routes: [
    // Routes will be added here
    // {
    //   path: '/vehicles',
    //   name: 'Vehicles',
    //   component: lazy(() => import('./pages/VehiclesList')),
    //   icon: '🚗',
    //   order: 2,
    // }
  ],
  stores: [
    // Add Redux slices
    // {
    //   name: 'vehicles',
    //   reducer: vehiclesReducer,
    // }
  ],
  permissions: ['vehicle:read', 'vehicle:create', 'vehicle:update', 'vehicle:delete'],
};

export default vendorsModuleConfig;

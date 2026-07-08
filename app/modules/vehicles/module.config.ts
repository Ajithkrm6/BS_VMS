/**
 * Vehicles Module Configuration
 * Vehicle management feature
 */

import type { ModuleConfig } from '~/core/utils/moduleRegistry';

export const vehiclesModuleConfig: ModuleConfig = {
  id: 'vehicles',
  name: 'Vehicles',
  description: 'Vehicle management and tracking',
  version: '1.0.0',
  featureFlag: 'vehicleManagement',
  order: 1,
  category: 'business',
  dependencies: ['auth', 'core'],
  routes: [],
  permissions: [
    {
      resource: 'vehicles',
      actions: ['read', 'create', 'update', 'delete'],
    },
  ],
};

export default vehiclesModuleConfig;

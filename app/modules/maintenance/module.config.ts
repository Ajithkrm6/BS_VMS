/**
 * Maintenance Module Configuration
 * Maintenance tracking and management
 */

import type { ModuleConfig } from '~/core/utils/moduleRegistry';

export const maintenanceModuleConfig: ModuleConfig = {
  id: 'maintenance',
  name: 'Maintenance',
  description: 'Maintenance scheduling and tracking',
  version: '1.0.0',
  featureFlag: 'maintenanceTracking',
  order: 2,
  category: 'business',
  dependencies: ['auth', 'core'],
  routes: [],
  permissions: [
    {
      resource: 'maintenance',
      actions: ['read', 'create', 'update', 'delete'],
    },
  ],
};

export default maintenanceModuleConfig;

/**
 * Recruiting Module Configuration
 * Recruiting and vendor management feature
 */

import type { ModuleConfig } from '~/core/utils/moduleRegistry';

export const recruitingModuleConfig: ModuleConfig = {
  id: 'recruiting',
  name: 'Recruiting',
  description: 'Recruiting and vendor management',
  version: '1.0.0',
  featureFlag: 'recruitingManagement',
  order: 1,
  category: 'business',
  dependencies: ['auth', 'core'],
  routes: [],
  permissions: [
    {
      resource: 'recruiting',
      actions: ['read', 'create', 'update', 'delete'],
    },
  ],
};

export default recruitingModuleConfig;

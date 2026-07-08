/**
 * Reporting Module Configuration
 * Advanced reporting and analytics
 */

import type { ModuleConfig } from '~/core/utils/moduleRegistry';

export const reportingModuleConfig: ModuleConfig = {
  id: 'reporting',
  name: 'Reporting',
  description: 'Advanced reporting and analytics',
  version: '1.0.0',
  featureFlag: 'advancedReporting',
  order: 3,
  category: 'business',
  dependencies: ['auth', 'core'],
  routes: [],
  permissions: [
    {
      resource: 'reports',
      actions: ['read'],
    },
  ],
};

export default reportingModuleConfig;

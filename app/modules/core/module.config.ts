/**
 * Core Module Configuration
 * Authentication and core functionality
 */

import type { ModuleConfig } from '~/utils/moduleRegistry';

export const coreModuleConfig: ModuleConfig = {
  name: 'core',
  version: '1.0.0',
  featureFlag: 'authentication',
  description: 'Core authentication and user management',
  routes: [],
  stores: [
    // Add Redux slices here
    // {
    //   name: 'auth',
    //   reducer: authReducer,
    // }
  ],
  permissions: ['user:read', 'user:manage'],
};

export default coreModuleConfig;

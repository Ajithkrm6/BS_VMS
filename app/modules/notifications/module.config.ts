/**
 * Notifications Module Configuration
 * In-app notifications system
 */

import type { ModuleConfig } from '~/utils/moduleRegistry';

export const notificationsModuleConfig: ModuleConfig = {
  name: 'notifications',
  version: '1.0.0',
  featureFlag: 'notificationSystem',
  description: 'In-app notifications and alerts',
  dependencies: ['core'],
  stores: [
    // Add Redux slices
    // {
    //   name: 'notifications',
    //   reducer: notificationsReducer,
    // }
  ],
  permissions: ['notification:read'],
};

export default notificationsModuleConfig;

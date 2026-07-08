/**
 * Notifications Module Configuration
 * In-app notification system
 */

import type { ModuleConfig } from '~/core/utils/moduleRegistry';

export const notificationsModuleConfig: ModuleConfig = {
  id: 'notifications',
  name: 'Notifications',
  description: 'In-app notification system',
  version: '1.0.0',
  featureFlag: 'notificationSystem',
  order: 4,
  category: 'core',
  dependencies: ['auth'],
  routes: [],
  permissions: [
    {
      resource: 'notifications',
      actions: ['read'],
    },
  ],
};

export default notificationsModuleConfig;

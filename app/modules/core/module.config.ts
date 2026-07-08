/**
 * Core Module Configuration
 * Core features and dashboard (always loaded)
 *
 * This module provides:
 * - Dashboard page
 * - Navigation
 * - Layout
 */

import { lazy } from 'react';
import type { ModuleConfig } from '~/core/utils/moduleRegistry';

export const coreModuleConfig: ModuleConfig = {
  // Identification
  id: 'core',
  name: 'Core',
  description: 'Core application features and dashboard',
  version: '1.0.0',

  // Feature flag
  featureFlag: 'authentication', // Always available if auth is available

  // Organization
  order: 0, // Load first
  category: 'core',

  // Routes
  routes: [
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: lazy(() => import('~/routes/index').then((m) => ({ default: m.Dashboard }))),
      icon: '📊',
      order: 0,
    },
  ],

  // Permissions
  permissions: [
    {
      resource: 'dashboard',
      actions: ['read'],
    },
  ],

  // Lifecycle hooks
  onLoad: async () => {
    console.debug('Core module loaded');
  },

  onUnload: async () => {
    console.debug('Core module unloading');
  },
};

export default coreModuleConfig;

/**
 * Auth Module Configuration
 * Authentication and authorization module
 *
 * This module handles:
 * - User login/registration
 * - Session management
 * - Protected routes
 * - Permissions and role management
 */

import { lazy } from 'react';
import authReducer from '~/stores/authSlice';
import type { ModuleConfig } from '~/core/utils/moduleRegistry';

export const authModuleConfig: ModuleConfig = {
  // Identification
  id: 'auth',
  name: 'Authentication',
  description: 'User authentication and authorization',
  version: '1.0.0',

  // Feature flag
  featureFlag: 'authentication',

  // Organization
  order: 0, // Load first (dependencies should be first)
  category: 'core',

  // Routes
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: lazy(() => import('~/Auth/Pages/AuthPage').then((m) => ({ default: m.AuthPage }))),
      order: 1,
    },
    {
      path: '/register',
      name: 'Register',
      component: lazy(() => import('~/Auth/Pages/AuthPage').then((m) => ({ default: m.AuthPage }))),
      order: 2,
    },
  ],

  // Redux
  reducers: [
    {
      name: 'auth',
      reducer: authReducer as any,
    },
  ],

  // Permissions
  permissions: [
    {
      resource: 'auth',
      actions: ['read', 'create'],
    },
  ],

  // Lifecycle hooks
  onLoad: async () => {
    console.debug('Auth module loaded');
  },

  onUnload: async () => {
    console.debug('Auth module unloading');
    // Clean up any auth resources
  },
};

export default authModuleConfig;

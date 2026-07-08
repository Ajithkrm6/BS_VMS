/**
 * Opportunities Module Configuration
 * Job postings and career opportunities
 *
 * This module handles:
 * - Job postings management
 * - Opportunity browsing
 * - Job details and applications
 */

import { lazy } from 'react';
import opportunitiesReducer from './stores/opportunitiesSlice';
import type { ModuleConfig } from '~/core/utils/moduleRegistry';

export const opportunitiesModuleConfig: ModuleConfig = {
  // Identification
  id: 'opportunities',
  name: 'Job Opportunities',
  description: 'Job postings and career opportunities',
  version: '1.0.0',

  // Feature flag
  featureFlag: 'jobPostings',

  // Organization
  order: 1, // After core modules
  category: 'business',

  // Dependencies
  dependencies: ['auth', 'core'],

  // Routes
  routes: [
    {
      path: '/opportunities',
      name: 'Opportunities',
      component: lazy(() => import('./pages/OpportunitiesPage')),
      icon: '💼',
      order: 4,
    },
    {
      path: '/opportunities/:id',
      name: 'Job Details',
      component: lazy(() => import('./pages/JobDetailsPage')),
      icon: '📄',
      order: 5,
    },
  ],

  // Redux
  reducers: [
    {
      name: 'opportunities',
      reducer: opportunitiesReducer as any,
    },
  ],

  // Permissions
  permissions: [
    {
      resource: 'opportunities',
      actions: ['read', 'create', 'update', 'delete'],
    },
  ],

  // Lifecycle hooks
  onLoad: async () => {
    console.debug('Opportunities module loaded');
  },

  onUnload: async () => {
    console.debug('Opportunities module unloading');
  },
};

export default opportunitiesModuleConfig;

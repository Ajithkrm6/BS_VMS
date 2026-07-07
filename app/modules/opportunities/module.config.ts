/**
 * Opportunities Module Configuration
 * Job postings and career management
 */

import { lazy } from 'react';
import type { ModuleConfig } from '~/utils/moduleRegistry';
import opportunitiesReducer from './stores/opportunitiesSlice';
import JobDetailsPage from './pages/JobDetailsPage';

export const opportunitiesModuleConfig: ModuleConfig = {
  name: 'opportunities',
  version: '1.0.0',
  featureFlag: 'jobPostings',
  description: 'Job postings and career opportunities',
  dependencies: ['core'],

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
      component: JobDetailsPage,
      icon: '📄',
      order: 5,
    },
  ],

  stores: [
    {
      name: 'opportunities',
      reducer: opportunitiesReducer,
    },
  ],

  permissions: ['opportunities:read', 'opportunities:create', 'opportunities:edit'],
};

export default opportunitiesModuleConfig;

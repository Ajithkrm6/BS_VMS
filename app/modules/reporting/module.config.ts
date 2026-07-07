/**
 * Vendor Billing Module Configuration
 * Vendor invoicing and payment tracking
 */

import type { ModuleConfig } from '~/utils/moduleRegistry';

export const vendorBillingModuleConfig: ModuleConfig = {
  name: 'vendorBilling',
  version: '1.0.0',
  featureFlag: 'vendorBilling',
  description: 'Vendor invoicing and payment management',
  dependencies: ['core', 'vendors'],
  routes: [
    // Routes will be added here
    // {
    //   path: '/reports',
    //   name: 'Reports',
    //   component: lazy(() => import('./pages/ReportsHub')),
    //   icon: '📊',
    //   order: 10,
    // }
  ],
  stores: [
    // Add Redux slices
    // {
    //   name: 'reports',
    //   reducer: reportsReducer,
    // }
  ],
  permissions: ['report:read', 'report:export'],
};

export default vendorBillingModuleConfig;

/**
 * Landing Module Configuration
 * Public pages that don't require authentication
 *
 * This module demonstrates:
 * - Public routes (isPublic: true)
 * - No sidebar or authentication required
 * - Simple, clean pages
 */

import { lazy } from 'react';
import type { ModuleConfig } from '~/core/utils/moduleRegistry';

export const landingModuleConfig: ModuleConfig = {
  // Identification
  id: 'landing',
  name: 'Landing',
  description: 'Public landing pages',
  version: '1.0.0',

  // Feature flag (always enabled)
  featureFlag: 'landingPages',

  // Load first (before protected modules)
  order: -1,
  category: 'public',

  // No dependencies for public module
  dependencies: [],

  // Public routes (no auth required, no sidebar)
  routes: [
    {
      path: '/',
      name: 'Home',
      component: lazy(() =>
        import('~/modules/landing/pages/LandingPage').then((m) => ({ default: m.default }))
      ),
      isPublic: true, // ← Anyone can see this
      order: 1,
    },
    // {
    //   path: '/privacy',
    //   name: 'Privacy',
    //   component: lazy(() =>
    //     import('~/modules/landing/pages/PrivacyPage').then((m) => ({ default: m.PrivacyPage }))
    //   ),
    //   isPublic: true,
    //   order: 2,
    // },
    // {
    //   path: '/terms',
    //   name: 'Terms',
    //   component: lazy(() =>
    //     import('~/modules/landing/pages/TermsPage').then((m) => ({ default: m.TermsPage }))
    //   ),
    //   isPublic: true,
    //   order: 3,
    // },
  ],

  // No Redux for landing (optional: you can add if needed)
  reducers: [],

  // Lifecycle
  onLoad: async () => {
    console.log('✓ Landing module loaded');
  },
};

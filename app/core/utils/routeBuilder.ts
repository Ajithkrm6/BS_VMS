/**
 * Route Builder (Simplified)
 * Automatically separates and organizes routes by access level
 *
 * This creates:
 * 1. Public routes (landing, privacy, terms) - no auth needed, no sidebar
 * 2. Auth routes (login, register) - no auth needed, no sidebar
 * 3. Protected routes (everything else) - requires auth, with sidebar
 */

import React, { Suspense, type ReactNode } from 'react';
import type { RouteObject } from 'react-router-dom';
import type { ModuleRoute } from './moduleRegistry';
import { moduleRegistry } from './moduleRegistry';
import { LayoutWrapper } from '~/core/components/LayoutWrapper';

// Loading spinner for lazy-loaded routes
function RouteLoader() {
  return React.createElement(
    'div',
    { className: 'flex items-center justify-center min-h-screen bg-gray-50' },
    React.createElement(
      'div',
      { className: 'text-center' },
      React.createElement('div', {
        className: 'animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4',
      }),
      React.createElement('p', { className: 'text-gray-600 font-medium' }, 'Loading...')
    )
  );
}

/**
 * Convert a single ModuleRoute to RouteObject
 */
function convertToRouteObject(route: ModuleRoute, isProtected: boolean = false): RouteObject {
  // Wrap lazy component in Suspense
  const Component = route.component as React.ComponentType<any>;

  const element = React.createElement(
    Suspense,
    { fallback: React.createElement(RouteLoader) },
    React.createElement(Component)
  ) as ReactNode;

  // For public/auth routes at root, use normal paths
  // For protected routes inside /app layout, use index for "/" routes
  if (isProtected && route.path === '/') {
    return {
      index: true,
      element,
      children: route.children?.map((child) => convertToRouteObject(child, isProtected)),
    } as RouteObject;
  }

  // For protected routes, remove leading slash to make them relative paths
  let pathToUse = route.path;
  if (isProtected && pathToUse !== '/' && pathToUse.startsWith('/')) {
    pathToUse = pathToUse.substring(1);
  }

  return {
    path: pathToUse,
    element,
    children: route.children?.map((child) => convertToRouteObject(child, isProtected)),
  };
}

/**
 * Convert module routes to React Router RouteObject format
 * Automatically separates routes by access level
 */
export function buildRoutesFromModules(): RouteObject[] {
  const moduleRoutes = moduleRegistry.getRoutes();

  // Separate routes by access level
  const publicRoutes = moduleRoutes.filter((r) => r.isPublic === true);
  const authRoutes = moduleRoutes.filter(
    (r) => r.path === '/login' || r.path === '/register' || r.path === '/auth'
  );
  const protectedRoutes = moduleRoutes.filter(
    (r) =>
      r.isPublic !== true && r.path !== '/login' && r.path !== '/register' && r.path !== '/auth'
  );

  // Convert routes to RouteObjects
  const publicRouteObjects = publicRoutes.map((route) => convertToRouteObject(route, false));
  const authRouteObjects = authRoutes.map((route) => convertToRouteObject(route, false));
  const protectedRouteObjects = protectedRoutes.map((route) => convertToRouteObject(route, true));

  // Build final routes array
  // Order: Auth routes -> Public routes -> Protected routes with layout -> 404
  const routes: RouteObject[] = [
    // Auth routes first (login, register)
    ...authRouteObjects,

    // Public routes (landing pages)
    ...publicRouteObjects,

    // Protected routes wrapped with /app layout
    ...(protectedRouteObjects.length > 0
      ? [
          {
            path: '/app',
            element: React.createElement(LayoutWrapper) as ReactNode,
            children: protectedRouteObjects,
          } as RouteObject,
        ]
      : []),

    // 404 fallback (lowest priority, catches everything else)
    {
      path: '*',
      element: React.createElement(
        'div',
        { className: 'flex items-center justify-center min-h-screen' },
        React.createElement(
          'div',
          { className: 'text-center' },
          React.createElement('h1', { className: 'text-4xl font-bold text-gray-800 mb-4' }, '404'),
          React.createElement('p', { className: 'text-gray-600 mb-8' }, 'Page not found'),
          React.createElement(
            'a',
            { href: '/', className: 'bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700' },
            'Go Home'
          )
        )
      ) as ReactNode,
    },
  ];

  return routes;
}

/**
 * Get routes grouped by module (for sidebar, menu, etc.)
 */
export function getGroupedRoutes(): Record<string, ModuleRoute[]> {
  const moduleRoutes = moduleRegistry.getRoutes();
  const grouped: Record<string, ModuleRoute[]> = {};

  for (const route of moduleRoutes) {
    // Group by module (inferred from path first segment)
    const pathSegments = route.path.split('/').filter(Boolean);
    const module = pathSegments[0] || 'root';

    if (!grouped[module]) {
      grouped[module] = [];
    }
    grouped[module].push(route);
  }

  return grouped;
}

/**
 * Get all navigable routes (with icons/names for menus)
 */
export function getNavigableRoutes(): ModuleRoute[] {
  return moduleRegistry.getRoutes().filter((route) => route.name && route.icon);
}

/**
 * Get root routes only (excludes nested routes)
 */
export function getRootRoutes(): ModuleRoute[] {
  return moduleRegistry.getRoutes().filter((route) => {
    const pathSegments = route.path.split('/').filter(Boolean);
    return pathSegments.length === 1;
  });
}

/**
 * Check if a route exists
 */
export function routeExists(path: string): boolean {
  return moduleRegistry.getRoutes().some((route) => route.path === path);
}

/**
 * Get breadcrumb route from path
 */
export function getBreadcrumbs(path: string): ModuleRoute[] {
  const segments = path.split('/').filter(Boolean);
  const breadcrumbs: ModuleRoute[] = [];

  for (let i = 1; i <= segments.length; i++) {
    const currentPath = '/' + segments.slice(0, i).join('/');
    const route = moduleRegistry.getRoutes().find((r) => r.path === currentPath);
    if (route) {
      breadcrumbs.push(route);
    }
  }

  return breadcrumbs;
}

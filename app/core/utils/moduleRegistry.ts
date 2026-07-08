/**
 * Module Registry System (v2.0)
 * Centralized, dynamic module management with feature flag integration
 *
 * This is the single source of truth for all modules.
 * Each module registers itself here.
 */

import type { Reducer } from '@reduxjs/toolkit';

/**
 * Route definition for a module
 */
export interface ModuleRoute {
  path: string;
  name: string;
  component: React.LazyExoticComponent<any> | React.ComponentType<any>;
  icon?: string;
  order?: number;
  children?: ModuleRoute[];

  // NEW: Simplified access control
  isPublic?: boolean; // true = no auth required, no layout
  requiresAuth?: boolean; // true = requires login (default for non-public)
  roles?: string[]; // Optional: restrict by user roles
}

/**
 * Redux reducer definition for a module
 */
export interface ModuleReducer {
  name: string;
  reducer: Reducer<any>;
}

/**
 * Permission definition for a module
 */
export interface ModulePermission {
  resource: string;
  actions: ('read' | 'create' | 'update' | 'delete')[];
}

/**
 * Complete module configuration
 */
export interface ModuleConfig {
  // Identification
  id: string;
  name: string;
  description: string;
  version: string;

  // Feature Flag
  featureFlag: string;

  // Organization
  order?: number; // For sorting in UI
  category?: string; // e.g., 'core', 'business', 'admin'

  // Dependencies
  dependencies?: string[];

  // Content
  routes?: ModuleRoute[];
  reducers?: ModuleReducer[];
  permissions?: ModulePermission[];

  // Lifecycle hooks
  onLoad?: () => Promise<void>;
  onUnload?: () => Promise<void>;
}

/**
 * Module Registry
 * Singleton that manages all modules
 */
export class ModuleRegistry {
  private static instance: ModuleRegistry;
  private modules: Map<string, ModuleConfig> = new Map();
  private loadedModules: Set<string> = new Set();
  private listeners: Set<(modules: Map<string, ModuleConfig>) => void> = new Set();

  private constructor() {}

  /**
   * Get singleton instance
   */
  static getInstance(): ModuleRegistry {
    if (!ModuleRegistry.instance) {
      ModuleRegistry.instance = new ModuleRegistry();
    }
    return ModuleRegistry.instance;
  }

  /**
   * Register a module
   */
  registerModule(config: ModuleConfig): void {
    if (this.modules.has(config.id)) {
      console.warn(`Module "${config.id}" already registered. Overwriting...`);
    }
    this.modules.set(config.id, config);
    this.notifyListeners();
  }

  /**
   * Register multiple modules at once
   */
  registerModules(configs: ModuleConfig[]): void {
    configs.forEach((config) => this.registerModule(config));
  }

  /**
   * Get module by ID
   */
  getModule(id: string): ModuleConfig | undefined {
    return this.modules.get(id);
  }

  /**
   * Get all registered modules
   */
  getAllModules(): Map<string, ModuleConfig> {
    return new Map(this.modules);
  }

  /**
   * Get all loaded modules
   */
  getLoadedModules(): Set<string> {
    return new Set(this.loadedModules);
  }

  /**
   * Check if module is loaded
   */
  isModuleLoaded(id: string): boolean {
    return this.loadedModules.has(id);
  }

  /**
   * Mark module as loaded
   */
  markModuleAsLoaded(id: string): void {
    const module = this.modules.get(id);
    if (!module) {
      throw new Error(`Cannot mark unknown module "${id}" as loaded`);
    }
    this.loadedModules.add(id);
    this.notifyListeners();
  }

  /**
   * Unload module
   */
  unloadModule(id: string): void {
    this.loadedModules.delete(id);
    this.notifyListeners();
  }

  /**
   * Get routes for all loaded modules (sorted by order)
   */
  getRoutes(): ModuleRoute[] {
    const routes: ModuleRoute[] = [];

    for (const moduleId of Array.from(this.loadedModules).sort((a, b) => {
      const moduleA = this.modules.get(a);
      const moduleB = this.modules.get(b);
      return (moduleA?.order ?? 0) - (moduleB?.order ?? 0);
    })) {
      const module = this.modules.get(moduleId);
      if (module?.routes) {
        routes.push(...module.routes);
      }
    }

    return routes;
  }

  /**
   * Get reducers for all loaded modules
   */
  getReducers(): Record<string, Reducer<any>> {
    const reducers: Record<string, Reducer<any>> = {};

    for (const moduleId of this.loadedModules) {
      const module = this.modules.get(moduleId);
      if (module?.reducers) {
        for (const { name, reducer } of module.reducers) {
          if (reducers[name]) {
            throw new Error(`Reducer name "${name}" is already registered. Use unique names.`);
          }
          reducers[name] = reducer;
        }
      }
    }

    return reducers;
  }

  /**
   * Get all permissions for loaded modules
   */
  getPermissions(): Record<string, string[]> {
    const permissions: Record<string, string[]> = {};

    for (const moduleId of this.loadedModules) {
      const module = this.modules.get(moduleId);
      if (module?.permissions) {
        for (const { resource, actions } of module.permissions) {
          permissions[resource] = actions;
        }
      }
    }

    return permissions;
  }

  /**
   * Validate dependencies
   */
  validateDependencies(moduleId: string): boolean {
    const module = this.modules.get(moduleId);
    if (!module?.dependencies) return true;

    for (const dep of module.dependencies) {
      if (!this.isModuleLoaded(dep)) {
        console.error(`Module "${moduleId}" depends on "${dep}" which is not loaded`);
        return false;
      }
    }
    return true;
  }

  /**
   * Subscribe to changes
   */
  subscribe(listener: (modules: Map<string, ModuleConfig>) => void): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  private notifyListeners(): void {
    this.listeners.forEach((listener) => listener(this.getAllModules()));
  }

  /**
   * Reset registry (for testing)
   */
  reset(): void {
    this.modules.clear();
    this.loadedModules.clear();
    this.notifyListeners();
  }
}

/**
 * Export singleton instance
 */
export const moduleRegistry = ModuleRegistry.getInstance();

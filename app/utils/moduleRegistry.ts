/**
 * Module Registry System
 * Manages dynamic module loading, routing, and feature registration
 */

export interface ModuleConfig {
  name: string;
  version: string;
  featureFlag: string; // Must be enabled to load module
  description: string;
  dependencies?: string[]; // Other modules this depends on
  routes?: ModuleRoute[];
  stores?: ModuleStore[];
  permissions?: string[];
}

export interface ModuleRoute {
  path: string;
  component: any; // React component (lazy or regular)
  name: string;
  icon?: string;
  order?: number;
}

export interface ModuleStore {
  name: string;
  reducer: any; // Redux reducer
}

export interface ModuleManifest {
  [moduleName: string]: ModuleConfig;
}

/**
 * Module Registry
 * Centralized registry for all feature modules
 */
export class ModuleRegistry {
  private registeredModules: Map<string, ModuleConfig> = new Map();
  private activeModules: Set<string> = new Set();
  private moduleInitializers: Map<string, () => Promise<ModuleConfig>> = new Map();

  /**
   * Register a module
   */
  registerModule(config: ModuleConfig): void {
    this.registeredModules.set(config.name, config);
  }

  /**
   * Register module initializer (lazy loading)
   */
  registerModuleInitializer(
    moduleName: string,
    initializer: () => Promise<ModuleConfig>
  ): void {
    this.moduleInitializers.set(moduleName, initializer);
  }

  /**
   * Load module dynamically
   */
  async loadModule(moduleName: string): Promise<ModuleConfig | null> {
    const initializer = this.moduleInitializers.get(moduleName);
    if (initializer) {
      try {
        const config = await initializer();
        this.registeredModules.set(moduleName, config);
        this.activeModules.add(moduleName);
        return config;
      } catch (error) {
        console.error(`Failed to load module: ${moduleName}`, error);
        return null;
      }
    }

    const config = this.registeredModules.get(moduleName);
    if (config) {
      this.activeModules.add(moduleName);
      return config;
    }

    return null;
  }

  /**
   * Unload module
   */
  unloadModule(moduleName: string): void {
    this.activeModules.delete(moduleName);
  }

  /**
   * Get module config
   */
  getModule(moduleName: string): ModuleConfig | null {
    return this.registeredModules.get(moduleName) || null;
  }

  /**
   * Get all registered modules
   */
  getRegisteredModules(): ModuleConfig[] {
    return Array.from(this.registeredModules.values());
  }

  /**
   * Get all active modules
   */
  getActiveModules(): ModuleConfig[] {
    return Array.from(this.activeModules).map((name) => this.registeredModules.get(name)!);
  }

  /**
   * Get routes from active modules
   */
  getActiveRoutes(): ModuleRoute[] {
    const routes: ModuleRoute[] = [];

    for (const moduleName of this.activeModules) {
      const module = this.registeredModules.get(moduleName);
      if (module?.routes) {
        routes.push(...module.routes);
      }
    }

    return routes.sort((a, b) => (a.order || 0) - (b.order || 0));
  }

  /**
   * Get stores from active modules
   */
  getActiveStores(): ModuleStore[] {
    const stores: ModuleStore[] = [];

    for (const moduleName of this.activeModules) {
      const module = this.registeredModules.get(moduleName);
      if (module?.stores) {
        stores.push(...module.stores);
      }
    }

    return stores;
  }

  /**
   * Check dependencies
   */
  validateDependencies(moduleName: string): boolean {
    const module = this.registeredModules.get(moduleName);
    if (!module?.dependencies) return true;

    return module.dependencies.every((dep) => this.activeModules.has(dep));
  }

  /**
   * Clear all modules
   */
  clear(): void {
    this.registeredModules.clear();
    this.activeModules.clear();
    this.moduleInitializers.clear();
  }
}

// Export singleton instance
export const moduleRegistry = new ModuleRegistry();

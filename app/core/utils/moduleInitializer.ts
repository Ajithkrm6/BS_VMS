/**
 * Module Initializer
 * Loads and initializes modules based on feature flags
 *
 * This is called during app startup to prepare all active modules.
 */

import { moduleRegistry } from './moduleRegistry';
import { FEATURE_FLAGS, FeatureFlags } from '~/utils/featureFlags';
import type { ModuleConfig } from './moduleRegistry';

/**
 * Options for module initialization
 */
export interface ModuleInitializerOptions {
  featureFlags?: FeatureFlags;
  environment?: 'development' | 'staging' | 'production';
  onModuleLoaded?: (moduleId: string) => void;
  onModuleLoadError?: (moduleId: string, error: Error) => void;
}

/**
 * Initialize modules based on feature flags and environment
 */
export async function initializeModules(
  options: ModuleInitializerOptions = {}
): Promise<Set<string>> {
  const {
    featureFlags = FEATURE_FLAGS,
    environment = import.meta.env.MODE === 'production' ? 'production' : 'development',
    onModuleLoaded,
    onModuleLoadError,
  } = options;

  const loadedModules = new Set<string>();

  // Get all registered modules
  const allModules = moduleRegistry.getAllModules();

  // Sort modules by dependencies (topological sort)
  const sortedModules = sortModulesByDependencies(Array.from(allModules.values()));

  // Load each module if its feature flag is enabled
  for (const module of sortedModules) {
    try {
      const isEnabled = isModuleEnabled(module, featureFlags, environment);

      if (!isEnabled) {
        console.debug(`Module "${module.id}" is disabled (feature flag: ${module.featureFlag})`);
        continue;
      }

      // Validate dependencies are loaded
      if (module.dependencies && module.dependencies.length > 0) {
        const missingDeps = module.dependencies.filter((dep) => !loadedModules.has(dep));
        if (missingDeps.length > 0) {
          throw new Error(`Missing dependencies: ${missingDeps.join(', ')}`);
        }
      }

      // Call onLoad hook if exists
      if (module.onLoad) {
        await module.onLoad();
      }

      // Mark as loaded
      moduleRegistry.markModuleAsLoaded(module.id);
      loadedModules.add(module.id);

      console.info(`✓ Module "${module.id}" loaded successfully`);
      onModuleLoaded?.(module.id);
    } catch (error) {
      const err = error instanceof Error ? error : new Error(String(error));
      console.error(`✗ Failed to load module "${module.id}": ${err.message}`);
      onModuleLoadError?.(module.id, err);
    }
  }

  return loadedModules;
}

/**
 * Check if a module is enabled
 */
function isModuleEnabled(
  module: ModuleConfig,
  featureFlags: FeatureFlags,
  environment: string
): boolean {
  const flag = featureFlags[module.featureFlag];

  if (!flag) {
    console.warn(`Feature flag "${module.featureFlag}" not found for module "${module.id}"`);
    return false;
  }

  if (!flag.enabled) {
    return false;
  }

  // Check environment
  if (flag.targetEnvironments && !flag.targetEnvironments.includes(environment as any)) {
    return false;
  }

  // Check rollout percentage
  if (flag.rolloutPercentage !== undefined && flag.rolloutPercentage < 100) {
    // Use a simple hash-based approach for consistent rollout
    const userHash = hashUserId(getUserId());
    const percentage = (userHash % 100) + 1;
    return percentage <= flag.rolloutPercentage;
  }

  return true;
}

/**
 * Sort modules by dependencies (topological sort)
 */
function sortModulesByDependencies(modules: ModuleConfig[]): ModuleConfig[] {
  const sorted: ModuleConfig[] = [];
  const visited = new Set<string>();
  const visiting = new Set<string>();

  const visit = (moduleId: string) => {
    if (visited.has(moduleId)) return;
    if (visiting.has(moduleId)) {
      throw new Error(`Circular dependency detected: ${moduleId}`);
    }

    visiting.add(moduleId);

    const module = modules.find((m) => m.id === moduleId);
    if (!module) {
      throw new Error(`Module "${moduleId}" not found in registry`);
    }

    if (module.dependencies) {
      for (const dep of module.dependencies) {
        visit(dep);
      }
    }

    visiting.delete(moduleId);
    visited.add(moduleId);
    sorted.push(module);
  };

  for (const module of modules) {
    visit(module.id);
  }

  return sorted;
}

/**
 * Get current user ID (for rollout percentage calculation)
 */
function getUserId(): string {
  // In a real app, this would come from auth
  return localStorage.getItem('userId') || 'anonymous';
}

/**
 * Simple hash function for user ID
 */
function hashUserId(userId: string): number {
  let hash = 0;
  for (let i = 0; i < userId.length; i++) {
    const char = userId.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return Math.abs(hash);
}

/**
 * Unload a module and call its cleanup hook
 */
export async function unloadModule(moduleId: string): Promise<void> {
  const module = moduleRegistry.getModule(moduleId);

  if (!module) {
    throw new Error(`Module "${moduleId}" not found`);
  }

  if (module.onUnload) {
    await module.onUnload();
  }

  moduleRegistry.unloadModule(moduleId);
  console.info(`✓ Module "${moduleId}" unloaded`);
}

/**
 * Reload a module
 */
export async function reloadModule(moduleId: string): Promise<void> {
  await unloadModule(moduleId);
  // Note: To reload with new feature flags, call initializeModules again
}

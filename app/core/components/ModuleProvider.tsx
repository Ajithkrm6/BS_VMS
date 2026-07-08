/**
 * Module Context Provider
 * Provides access to loaded modules throughout the app
 *
 * Use useModuleContext() hook to access this anywhere.
 */

import React, { createContext, useContext, useEffect, useState } from 'react';
import { moduleRegistry } from '../utils/moduleRegistry';
import type { ModuleConfig } from '../utils/moduleRegistry';

/**
 * Module context value
 */
export interface ModuleContextValue {
  loadedModules: Set<string>;
  allModules: Map<string, ModuleConfig>;
  isModuleLoaded: (moduleId: string) => boolean;
  getModule: (moduleId: string) => ModuleConfig | undefined;
}

/**
 * Create context
 */
const ModuleContext = createContext<ModuleContextValue | null>(null);

/**
 * Module Provider Props
 */
export interface ModuleProviderProps {
  children: React.ReactNode;
}

/**
 * Module Provider Component
 * Wrap your app with this to enable module context
 */
export function ModuleProvider({ children }: ModuleProviderProps) {
  const [loadedModules, setLoadedModules] = useState<Set<string>>(() =>
    moduleRegistry.getLoadedModules()
  );
  const [allModules, setAllModules] = useState<Map<string, ModuleConfig>>(() =>
    moduleRegistry.getAllModules()
  );

  useEffect(() => {
    // Subscribe to module registry changes
    const unsubscribe = moduleRegistry.subscribe((modules) => {
      setAllModules(new Map(modules));
      setLoadedModules(new Set(moduleRegistry.getLoadedModules()));
    });

    return unsubscribe;
  }, []);

  const value: ModuleContextValue = {
    loadedModules,
    allModules,
    isModuleLoaded: (moduleId: string) => moduleRegistry.isModuleLoaded(moduleId),
    getModule: (moduleId: string) => moduleRegistry.getModule(moduleId),
  };

  return <ModuleContext.Provider value={value}>{children}</ModuleContext.Provider>;
}

/**
 * Hook to use module context
 */
export function useModuleContext(): ModuleContextValue {
  const context = useContext(ModuleContext);

  if (!context) {
    throw new Error('useModuleContext must be used within <ModuleProvider>');
  }

  return context;
}

/**
 * Hook to check if a specific module is loaded
 */
export function useIsModuleLoaded(moduleId: string): boolean {
  const { loadedModules } = useModuleContext();
  return loadedModules.has(moduleId);
}

/**
 * Hook to get a specific module
 */
export function useModule(moduleId: string): ModuleConfig | undefined {
  const { allModules } = useModuleContext();
  return allModules.get(moduleId);
}

/**
 * Hook to get all loaded modules
 */
export function useLoadedModules(): Set<string> {
  const { loadedModules } = useModuleContext();
  return loadedModules;
}

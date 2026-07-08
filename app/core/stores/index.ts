/**
 * Redux Store Configuration
 * Creates a dynamic store that can accept module reducers
 *
 * This is called after modules are loaded to create a store with all active reducers.
 */

import { configureStore, Reducer } from '@reduxjs/toolkit';
import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';
import authReducer from '~/stores/authSlice';
import { moduleRegistry } from '../utils/moduleRegistry';

/**
 * Create app store with optional module reducers
 */
export function createAppStore(additionalReducers: Record<string, Reducer<any>> = {}) {
  // Get module reducers
  const moduleReducers = moduleRegistry.getReducers();

  // Merge all reducers
  const allReducers = {
    auth: authReducer,
    ...moduleReducers,
    ...additionalReducers,
  };

  return configureStore({
    reducer: allReducers,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          // Ignore these action types if they have non-serializable values
          ignoredActions: ['auth/logout'],
        },
      }),
  });
}

/**
 * Create store (called from app initialization)
 */
let storeInstance: ReturnType<typeof createAppStore>;

export function initializeStore(): ReturnType<typeof createAppStore> {
  storeInstance = createAppStore();
  return storeInstance;
}

export function getStore(): ReturnType<typeof createAppStore> {
  if (!storeInstance) {
    throw new Error('Store not initialized. Call initializeStore() before using the store.');
  }
  return storeInstance;
}

// Export types
export type RootState = ReturnType<typeof getStore>['getState'];
export type AppDispatch = ReturnType<typeof getStore>['dispatch'];

// Export hooks
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

/**
 * Feature Hooks
 * React hooks for using feature flags in components
 */

import { useCallback, useMemo } from 'react';
import type { FeatureFlagValue } from '~/utils/featureFlags';
import { featureFlagManager } from '~/utils/featureFlags';

/**
 * Hook: Check if feature is enabled
 * @param featureName - Name of the feature flag
 * @returns Whether the feature is enabled
 */
export function useFeature(featureName: string): boolean {
  return useMemo(() => featureFlagManager.isEnabled(featureName), [featureName]);
}

/**
 * Hook: Get feature configuration
 * @param featureName - Name of the feature flag
 * @returns Feature configuration object or null
 */
export function useFeatureConfig(featureName: string): Record<string, FeatureFlagValue> | null {
  return useMemo(() => featureFlagManager.getConfig(featureName), [featureName]);
}

/**
 * Hook: Get all enabled features
 * @returns Array of enabled feature names
 */
export function useEnabledFeatures(): string[] {
  return useMemo(() => featureFlagManager.getEnabledFeatures(), []);
}

/**
 * Hook: Set user for consistent rollout
 */
export function useSetFeatureFlagUser(userId: string): void {
  featureFlagManager.setUserIdentifier(userId);
}

/**
 * Hook: Safely render component if feature is enabled
 * @param featureName - Name of the feature flag
 * @param children - Content to render if enabled
 * @param fallback - Content to render if disabled (optional)
 */
export function useFeatureRender(
  featureName: string,
  children: React.ReactNode,
  fallback?: React.ReactNode
): React.ReactNode {
  const isEnabled = useFeature(featureName);
  return isEnabled ? children : fallback || null;
}

/**
 * Hook: Execute callback based on feature flag
 */
export function useFeatureCallback<T extends (...args: any[]) => any>(
  featureName: string,
  callback: T
): T | (() => void) {
  const isEnabled = useFeature(featureName);

  return useCallback(
    (...args: any[]) => {
      if (isEnabled) {
        return callback(...args);
      }
    },
    [isEnabled, callback]
  ) as T | (() => void);
}

/**
 * Hook: Get feature flag value with fallback
 */
export function useFeatureValue<T>(
  featureName: string,
  enabledValue: T,
  disabledValue: T
): T {
  const isEnabled = useFeature(featureName);
  return isEnabled ? enabledValue : disabledValue;
}

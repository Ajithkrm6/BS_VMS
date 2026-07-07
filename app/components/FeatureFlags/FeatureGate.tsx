/**
 * Feature Flag Components
 * React components for feature flag conditionals
 */

import React from 'react';
import { featureFlagManager } from '~/utils/featureFlags';

/**
 * Component: FeatureGate
 * Conditionally render content based on feature flag
 */
export interface FeatureGateProps {
  feature: string;
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export function FeatureGate({ feature, children, fallback }: FeatureGateProps) {
  if (featureFlagManager.isEnabled(feature)) {
    return <>{children}</>;
  }
  return fallback ? <>{fallback}</> : null;
}

/**
 * Component: MultiFeatureGate
 * Render based on multiple features (AND logic)
 */
export interface MultiFeatureGateProps {
  features: string[];
  logic?: 'AND' | 'OR';
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export function MultiFeatureGate({
  features,
  logic = 'AND',
  children,
  fallback,
}: MultiFeatureGateProps) {
  const isAllEnabled = features.every((f) => featureFlagManager.isEnabled(f));
  const isAnyEnabled = features.some((f) => featureFlagManager.isEnabled(f));

  const shouldRender = logic === 'AND' ? isAllEnabled : isAnyEnabled;

  if (shouldRender) {
    return <>{children}</>;
  }
  return fallback ? <>{fallback}</> : null;
}

/**
 * Component: FeaturePanel
 * Panel that shows feature config in development
 */
export interface FeaturePanelProps {
  feature: string;
  title?: string;
  children: React.ReactNode;
}

export function FeaturePanel({ feature, title, children }: FeaturePanelProps) {
  const flag = featureFlagManager.getFeatureFlag(feature);
  const isEnabled = featureFlagManager.isEnabled(feature);

  if (!flag) {
    return null;
  }

  return (
    <div
      className={`border rounded-lg p-4 mb-4 ${
        isEnabled ? 'border-green-300 bg-green-50' : 'border-gray-300 bg-gray-50'
      }`}
    >
      {import.meta.env.DEV && (
        <div className="text-xs text-gray-600 mb-2">
          <strong>Feature:</strong> {feature} | <strong>Status:</strong>{' '}
          <span className={isEnabled ? 'text-green-600' : 'text-red-600'}>
            {isEnabled ? 'ENABLED' : 'DISABLED'}
          </span>
        </div>
      )}
      {title && <h3 className="font-semibold mb-2">{title}</h3>}
      {isEnabled ? children : <p className="text-gray-500">Feature is disabled</p>}
    </div>
  );
}

/**
 * Component: FeatureBadge
 * Badge showing feature status
 */
export interface FeatureBadgeProps {
  feature: string;
  className?: string;
}

export function FeatureBadge({ feature, className = '' }: FeatureBadgeProps) {
  const isEnabled = featureFlagManager.isEnabled(feature);

  return (
    <span
      className={`inline-block px-2 py-1 rounded text-xs font-medium ${
        isEnabled
          ? 'bg-green-100 text-green-800'
          : 'bg-gray-100 text-gray-800 line-through opacity-50'
      } ${className}`}
    >
      {feature}
    </span>
  );
}

/**
 * Component: DebugFeatureFlags
 * Development-only component to debug feature flags
 */
export function DebugFeatureFlags() {
  if (!import.meta.env.DEV) {
    return null;
  }

  const allFeatures = featureFlagManager.getAllFeatures();
  const enabledFeatures = featureFlagManager.getEnabledFeatures();

  return (
    <div className="fixed bottom-4 right-4 max-w-md bg-white border-2 border-gray-300 rounded-lg p-4 shadow-lg max-h-96 overflow-y-auto">
      <h3 className="font-bold mb-3 text-sm">🚩 Feature Flags</h3>

      <div className="space-y-2 text-xs">
        <div>
          <strong>Enabled ({enabledFeatures.length}):</strong>
          <div className="ml-2 mt-1 space-y-1">
            {enabledFeatures.map((f) => (
              <FeatureBadge key={f} feature={f} />
            ))}
          </div>
        </div>

        <div className="border-t pt-2">
          <strong>All Features:</strong>
          <div className="ml-2 mt-1 space-y-1">
            {Object.entries(allFeatures).map(([name, flag]) => (
              <div key={name} className="bg-gray-50 p-2 rounded border-l-2 border-gray-300">
                <div className="flex items-center justify-between">
                  <span className="font-mono">{name}</span>
                  <FeatureBadge feature={name} />
                </div>
                {flag.description && <p className="text-gray-600 text-xs mt-1">{flag.description}</p>}
                {flag.rolloutPercentage !== undefined && (
                  <p className="text-gray-500 text-xs">Rollout: {flag.rolloutPercentage}%</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Example: Using Feature Gates
 * Simple component examples showing feature flag usage
 */

import { FeatureGate, FeatureBadge, MultiFeatureGate } from '@/FeatureFlags/FeatureGate';

/**
 * Example 1: Simple feature gate
 */
export function Example1_SimpleFeatureGate() {
  return (
    <div>
      <h2>Advanced Reporting Feature</h2>

      <FeatureGate
        feature="advancedReporting"
        fallback={<p className="text-gray-500">Advanced reporting is not available yet</p>}
      >
        <div className="p-4 bg-blue-50 border border-blue-300 rounded">
          <h3>Reports Dashboard</h3>
          <p>View advanced analytics and generate reports...</p>
        </div>
      </FeatureGate>
    </div>
  );
}

/**
 * Example 2: Multiple features gate
 */
export function Example2_MultiFeatureGate() {
  return (
    <div>
      <h2>Export to Excel</h2>

      <MultiFeatureGate
        features={['recruitingManagement', 'exportFeature']}
        logic="AND"
        fallback={<p>Export feature requires recruiting management</p>}
      >
        <button className="px-4 py-2 bg-green-600 text-white rounded">Export to Excel</button>
      </MultiFeatureGate>
    </div>
  );
}

/**
 * Example 3: Feature badges
 */
export function Example3_FeatureBadges() {
  return (
    <div className="space-y-2">
      <h2>Feature Status</h2>
      <FeatureBadge feature="recruitingManagement" />
      <FeatureBadge feature="advancedReporting" />
      <FeatureBadge feature="realTimeUpdates" />
    </div>
  );
}

/**
 * Example 4: Conditional UI
 */
export function Example4_ConditionalUI() {
  return (
    <div className="p-4 border rounded">
      <h2>Dashboard</h2>

      <FeatureGate feature="recruitingManagement">
        <section className="mt-4">
          <h3 className="font-semibold">Recruiting</h3>
          <p>Manage job postings, talent pool, and bench resources...</p>
        </section>
      </FeatureGate>

      <FeatureGate feature="maintenanceTracking">
        <section className="mt-4">
          <h3 className="font-semibold">Maintenance</h3>
          <p>Track maintenance schedules...</p>
        </section>
      </FeatureGate>

      <FeatureGate feature="advancedReporting">
        <section className="mt-4">
          <h3 className="font-semibold">Analytics</h3>
          <p>View advanced analytics and reports...</p>
        </section>
      </FeatureGate>
    </div>
  );
}

/**
 * Example 5: Dark mode feature
 */
export function Example5_DarkModeToggle() {
  return (
    <FeatureGate
      feature="darkMode"
      fallback={<p className="text-sm text-gray-500">Dark mode is not available</p>}
    >
      <button className="px-4 py-2 bg-gray-800 text-white rounded">🌙 Toggle Dark Mode</button>
    </FeatureGate>
  );
}

/**
 * Example 6: Real-time feature
 */
export function Example6_RealtimeNotifications() {
  return (
    <FeatureGate
      feature="realTimeUpdates"
      fallback={
        <p className="text-sm text-yellow-600">Real-time updates are being rolled out gradually</p>
      }
    >
      <div className="p-3 bg-green-50 border border-green-300 rounded text-sm">
        ✓ Real-time updates enabled - You will receive live notifications
      </div>
    </FeatureGate>
  );
}

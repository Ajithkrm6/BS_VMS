/**
 * Example: Using Feature Hooks
 * Advanced component examples using custom hooks
 */

import {
  useFeature,
  useFeatureConfig,
  useEnabledFeatures,
  useFeatureRender,
} from '~/hooks/useFeature';

/**
 * Example 1: useFeature hook
 */
export function Example1_UseFeatureHook() {
  const isReportingEnabled = useFeature('advancedReporting');

  return (
    <div>
      <h2>Reporting Module</h2>
      {isReportingEnabled ? (
        <div className="p-4 bg-blue-50 border border-blue-300 rounded">
          <h3>Advanced Reports</h3>
          <p>Generate and download detailed reports...</p>
          <button className="mt-2 px-4 py-2 bg-blue-600 text-white rounded">Open Reports</button>
        </div>
      ) : (
        <p className="text-gray-500">
          Advanced reporting is being rolled out to your account. Check back soon!
        </p>
      )}
    </div>
  );
}

/**
 * Example 2: useFeatureConfig hook
 */
export function Example2_UseFeatureConfig() {
  const recruitingConfig = useFeatureConfig('recruitingManagement');

  return (
    <div>
      <h2>Recruiting Management Config</h2>
      {recruitingConfig ? (
        <div className="p-4 bg-gray-50 border border-gray-300 rounded">
          <p>
            <strong>Max postings per page:</strong>{' '}
            {String(recruitingConfig.maxPostingsPerPage || 50)}
          </p>
          <p>
            <strong>Talent pool enabled:</strong>{' '}
            {recruitingConfig.enableTalentPool ? 'Enabled' : 'Disabled'}
          </p>
        </div>
      ) : (
        <p className="text-gray-500">Recruiting management is disabled</p>
      )}
    </div>
  );
}

/**
 * Example 3: useEnabledFeatures hook
 */
export function Example3_EnabledFeatures() {
  const enabledFeatures = useEnabledFeatures();

  return (
    <div>
      <h2>Active Features ({enabledFeatures.length})</h2>
      <ul className="list-disc list-inside space-y-1">
        {enabledFeatures.map((feature) => (
          <li key={feature} className="text-sm text-green-700">
            ✓ {feature}
          </li>
        ))}
      </ul>
    </div>
  );
}

/**
 * Example 4: useFeatureRender hook
 */
export function Example4_UseFeatureRender() {
  const navigationItems = useFeatureRender(
    'recruitingManagement',
    <>
      <li>
        <a href="/recruiting">Jobs & Postings</a>
      </li>
      <li>
        <a href="/recruiting/talent">Talent Pool</a>
      </li>
      <li>
        <a href="/recruiting/bench">Bench Resources</a>
      </li>
    </>,
    <li className="text-gray-400">Recruiting (Coming Soon)</li>
  );

  return (
    <div>
      <h2>Navigation Menu</h2>
      <ul className="space-y-2">{navigationItems}</ul>
    </div>
  );
}

/**
 * Example 5: Dynamic button availability
 */
export function Example5_DynamicButton() {
  const isExportEnabled = useFeature('exportFeature');

  return (
    <div>
      <h2>Data Management</h2>
      <div className="space-x-2">
        <button className="px-4 py-2 bg-blue-600 text-white rounded">Import Data</button>
        <button
          className={`px-4 py-2 rounded text-white ${
            isExportEnabled ? 'bg-green-600 cursor-pointer' : 'bg-gray-400 cursor-not-allowed'
          }`}
          disabled={!isExportEnabled}
        >
          Export Data
        </button>
      </div>
    </div>
  );
}

/**
 * Example 6: Conditional rendering with fallback
 */
export function Example6_ConditionalContent() {
  const content = useFeatureRender(
    'multiLanguage',
    <div className="p-4 bg-purple-50 border border-purple-300 rounded">
      <h3>Language Settings</h3>
      <select title="Language" name="language" className="w-full mt-2 p-2 border rounded">
        <option value="en">English</option>
        <option value="es">Spanish</option>
        <option value="fr">French</option>
      </select>
    </div>,
    <p className="text-gray-500 italic">Multi-language support coming soon</p>
  );

  return <div>{content}</div>;
}

/**
 * Example 7: Feature-based theme
 */
export function Example7_FeatureBasedTheme() {
  const isDarkModeEnabled = useFeature('darkMode');
  const themeClass = isDarkModeEnabled ? 'bg-gray-900 text-white' : 'bg-white text-gray-900';

  return (
    <div className={`p-4 rounded transition-colors ${themeClass}`}>
      <h2>Application Theme</h2>
      <p>Current mode: {isDarkModeEnabled ? '🌙 Dark' : '☀️ Light'}</p>
    </div>
  );
}

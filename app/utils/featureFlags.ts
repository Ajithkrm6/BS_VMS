/**
 * Feature Flags System
 * Centralized feature flag management with validation and rollout control
 */

export type FeatureFlagValue = boolean | string | number | Record<string, unknown> | string[];

export interface FeatureFlag {
  name: string;
  enabled: boolean;
  description?: string;
  rolloutPercentage?: number; // 0-100 for gradual rollout
  targetEnvironments?: ('development' | 'staging' | 'production')[];
  config?: Record<string, FeatureFlagValue>;
  dependencies?: string[]; // Other feature flags this depends on
  createdAt?: string;
  expiresAt?: string;
}

export interface FeatureFlags {
  [key: string]: FeatureFlag;
}

/**
 * Feature Flags Configuration
 * Define all features here with their settings
 */
export const FEATURE_FLAGS: FeatureFlags = {
  // Core Features
  authentication: {
    name: 'authentication',
    enabled: true,
    description: 'User authentication system',
    targetEnvironments: ['development', 'staging', 'production'],
  },

  // Vendor Management
  vendorManagement: {
    name: 'vendorManagement',
    enabled: true,
    description: 'Vendor CRUD operations and management',
    rolloutPercentage: 100,
    targetEnvironments: ['development', 'staging', 'production'],
    config: {
      maxVendorsPerPage: 50,
      enableBulkOperations: true,
    },
  },

  // Vendor Tracking
  vendorTracking: {
    name: 'vendorTracking',
    enabled: true,
    description: 'Track vendor performance and metrics',
    rolloutPercentage: 100,
    targetEnvironments: ['development', 'staging', 'production'],
    dependencies: ['vendorManagement'],
  },

  // Vendor Billing
  vendorBilling: {
    name: 'vendorBilling',
    enabled: false,
    description: 'Vendor invoicing and payment tracking',
    rolloutPercentage: 50, // 50% rollout
    targetEnvironments: ['staging', 'production'],
    config: {
      invoiceFormats: ['pdf', 'excel', 'csv'],
    },
  },

  darkMode: {
    name: 'darkMode',
    enabled: true,
    description: 'Dark mode theme support',
    targetEnvironments: ['development', 'staging', 'production'],
  },

  realTimeUpdates: {
    name: 'realTimeUpdates',
    enabled: false,
    description: 'Real-time WebSocket updates',
    rolloutPercentage: 25,
    targetEnvironments: ['staging', 'production'],
    config: {
      wsUrl: 'wss://api.example.com/ws',
      reconnectAttempts: 5,
    },
  },

  notificationSystem: {
    name: 'notificationSystem',
    enabled: true,
    description: 'In-app notifications',
    targetEnvironments: ['development', 'staging', 'production'],
    config: {
      enableEmail: false,
      enablePushNotifications: false,
      enableInApp: true,
    },
  },

  exportFeature: {
    name: 'exportFeature',
    enabled: true,
    description: 'Export data to multiple formats',
    rolloutPercentage: 75,
    targetEnvironments: ['staging', 'production'],
    config: {
      formats: ['csv', 'excel', 'json'],
    },
  },

  multiLanguage: {
    name: 'multiLanguage',
    enabled: false,
    description: 'Multi-language support (i18n)',
    rolloutPercentage: 0,
    targetEnvironments: ['development'],
    config: {
      defaultLanguage: 'en',
      supportedLanguages: ['en', 'es', 'fr'],
    },
  },
};

/**
 * Feature Flag Manager
 * Utility to check, validate, and manage feature flags
 */
export class FeatureFlagManager {
  private flags: FeatureFlags;
  private environment: 'development' | 'staging' | 'production';
  private userIdentifier: string = 'default';

  constructor(
    flags: FeatureFlags = FEATURE_FLAGS,
    environment: 'development' | 'staging' | 'production' = 'development'
  ) {
    this.flags = flags;
    this.environment = environment;
  }

  /**
   * Check if a feature is enabled
   */
  isEnabled(featureName: string): boolean {
    const flag = this.flags[featureName];

    if (!flag) {
      console.warn(`Feature flag "${featureName}" not found`);
      return false;
    }

    // Check environment
    if (flag.targetEnvironments && !flag.targetEnvironments.includes(this.environment)) {
      return false;
    }

    // Check if expired
    if (flag.expiresAt && new Date(flag.expiresAt) < new Date()) {
      return false;
    }

    // Check rollout percentage (consistent per user)
    if (flag.rolloutPercentage !== undefined && flag.rolloutPercentage !== 100) {
      const hash = this.hashString(this.userIdentifier + featureName);
      const percentage = (hash % 100) + 1;
      return percentage <= flag.rolloutPercentage;
    }

    // Check dependencies
    if (flag.dependencies) {
      for (const dependency of flag.dependencies) {
        if (!this.isEnabled(dependency)) {
          return false;
        }
      }
    }

    return flag.enabled;
  }

  /**
   * Get feature flag configuration
   */
  getConfig(featureName: string): Record<string, FeatureFlagValue> | null {
    if (!this.isEnabled(featureName)) {
      return null;
    }
    return this.flags[featureName].config || {};
  }

  /**
   * Get all enabled features
   */
  getEnabledFeatures(): string[] {
    return Object.keys(this.flags).filter((name) => this.isEnabled(name));
  }

  /**
   * Set user identifier for consistent rollout
   */
  setUserIdentifier(identifier: string): void {
    this.userIdentifier = identifier;
  }

  /**
   * Simple hash function for rollout percentage
   */
  private hashString(str: string): number {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = (hash << 5) - hash + char;
      hash = hash & hash; // Convert to 32-bit integer
    }
    return Math.abs(hash);
  }

  /**
   * Get feature flag details
   */
  getFeatureFlag(featureName: string): FeatureFlag | null {
    return this.flags[featureName] || null;
  }

  /**
   * Get all features info
   */
  getAllFeatures(): FeatureFlags {
    return this.flags;
  }

  /**
   * Temporarily override a feature flag (for testing)
   */
  override(featureName: string, enabled: boolean): void {
    if (this.flags[featureName]) {
      this.flags[featureName].enabled = enabled;
    } else {
      console.warn(`Cannot override unknown feature: ${featureName}`);
    }
  }

  /**
   * Reset to default configuration
   */
  reset(): void {
    this.flags = FEATURE_FLAGS;
  }
}

// Export singleton instance
const environment = (import.meta.env.VITE_APP_ENV || 'development') as
  'development' | 'staging' | 'production';

export const featureFlagManager = new FeatureFlagManager(FEATURE_FLAGS, environment);

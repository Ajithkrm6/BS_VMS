#!/usr/bin/null

# 🚩 Complete Feature Flags Guide - Create, Enable, Disable & Use

A step-by-step guide to understanding and working with feature flags in BS-VMS.

---

## 📍 What Are Feature Flags?

**Feature flags** are settings that control whether a feature is enabled or disabled in your application. Think of them as **switches** you can toggle ON/OFF without redeploying code.

### Real-World Example

```
Job Postings Feature
├─ Flag Name: jobPostings
├─ Status: enabled: true
├─ Rollout: 100% (everyone can see it)
└─ Result: Job postings module loads and routes become available
```

---

## 🎯 Feature Flags System Overview

### Architecture Diagram

```
┌─────────────────────────────────────────────────────┐
│   1. DEFINE FLAGS (app/utils/featureFlags.ts)       │
│   ├─ authentication: { enabled: true, ... }        │
│   ├─ jobPostings: { enabled: true, ... }           │
│   ├─ vendorBilling: { enabled: false, ... }        │
│   └─ darkMode: { enabled: true, ... }              │
└─────────────────────────────────────────────────────┘
                       ↓
┌─────────────────────────────────────────────────────┐
│   2. CHECK FLAGS (in components)                    │
│   ├─ useFeature(flagName)                          │
│   ├─ <FeatureGate feature="flagName">              │
│   └─ featureFlagManager.isEnabled(flagName)        │
└─────────────────────────────────────────────────────┘
                       ↓
┌─────────────────────────────────────────────────────┐
│   3. SHOW/HIDE CONTENT (conditional rendering)     │
│   ├─ Show feature if enabled: true                 │
│   ├─ Hide feature if enabled: false                │
│   └─ Show fallback content if needed               │
└─────────────────────────────────────────────────────┘
```

---

## 📂 Where Feature Flags Are Located

### Main File: `app/utils/featureFlags.ts`

```typescript
This file contains:
├─ FeatureFlag interface (type definition)
├─ FEATURE_FLAGS constant (all flags)
├─ FeatureFlagManager class (logic)
└─ featureFlagManager instance (exported singleton)
```

### Usage Files:

```typescript
app/hooks/useFeature.ts
  └─ Custom hooks for accessing flags

app/components/FeatureFlags/FeatureGate.tsx
  └─ React components for conditional rendering

app/modules/*/module.config.ts
  └─ Module registration with feature flags
```

---

## 🔧 Step 1: Understanding Feature Flag Structure

### Complete Example: Vendor Billing Feature

```typescript
// app/utils/featureFlags.ts

export const FEATURE_FLAGS: FeatureFlags = {
  vendorBilling: {
    // ✅ What is the flag name?
    name: 'vendorBilling',

    // ✅ Is it enabled or disabled?
    enabled: false,

    // ✅ What does it do?
    description: 'Vendor invoicing and payment tracking',

    // ✅ What percentage of users see it? (for gradual rollout)
    rolloutPercentage: 50, // 0-100 (0=none, 50=half, 100=everyone)

    // ✅ Where should it be available?
    targetEnvironments: ['staging', 'production'],

    // ✅ What settings does this feature need?
    config: {
      invoiceFormats: ['pdf', 'excel', 'csv'],
      enableAutoPayments: true,
      paymentGateway: 'stripe',
    },

    // ✅ Does it depend on other features?
    dependencies: ['vendorManagement'], // Needs vendors module

    // ✅ When was it created?
    createdAt: '2026-06-01',

    // ✅ When should it be removed? (optional)
    expiresAt: '2026-12-31',
  },
};
```

### Field Explanations

| Field                | Type    | Required | Purpose                                |
| -------------------- | ------- | -------- | -------------------------------------- |
| `name`               | string  | ✅       | Unique identifier (used in code)       |
| `enabled`            | boolean | ✅       | Is this feature ON or OFF?             |
| `description`        | string  | ✅       | What does this feature do?             |
| `rolloutPercentage`  | 0-100   | ❌       | % of users seeing it (gradual rollout) |
| `targetEnvironments` | array   | ❌       | dev/staging/production environments    |
| `config`             | object  | ❌       | Feature-specific settings/options      |
| `dependencies`       | array   | ❌       | Other required features                |
| `createdAt`          | string  | ❌       | When was it created?                   |
| `expiresAt`          | string  | ❌       | When should it be removed?             |

---

## ✨ Step 2: Create a New Feature Flag

### Real Example: Adding "Email Notifications" Feature

#### Step 2a: Define the Flag

```typescript
// File: app/utils/featureFlags.ts
// Location: Inside FEATURE_FLAGS object

export const FEATURE_FLAGS: FeatureFlags = {
  // ... existing flags ...

  // ✅ NEW FLAG: Email Notifications
  emailNotifications: {
    name: 'emailNotifications',
    enabled: false, // Start disabled (beta)
    description: 'Send email notifications to vendors',
    rolloutPercentage: 0, // 0% = no one sees it yet
    targetEnvironments: ['staging'], // Only in staging
    config: {
      sendNotifications: true,
      notificationType: ['reminder', 'alert'],
      scheduleType: 'immediate',
      maxEmailsPerDay: 100,
    },
    dependencies: ['notificationSystem'], // Needs base notification system
    createdAt: '2026-06-30',
    expiresAt: '2026-12-31', // Remove after 6 months
  },
};
```

### Feature Flag States (Common Examples)

```typescript
// ✅ CASE 1: Feature is READY (fully enabled)
newFeature: {
  enabled: true,
  rolloutPercentage: 100,
  targetEnvironments: ['development', 'staging', 'production']
}

// ✅ CASE 2: Feature is BETA (gradual rollout)
betaFeature: {
  enabled: true,
  rolloutPercentage: 25,  // Only 25% of users
  targetEnvironments: ['staging', 'production']
}

// ✅ CASE 3: Feature is TESTING (dev only)
testingFeature: {
  enabled: true,
  rolloutPercentage: 100,
  targetEnvironments: ['development']  // Dev only
}

// ✅ CASE 4: Feature is DISABLED (turned off)
disabledFeature: {
  enabled: false,
  rolloutPercentage: 0,
  targetEnvironments: []
}
```

---

## 🔌 Step 3: Use Feature Flag in Components

### Method 1: Using Hook (Recommended)

```typescript
// File: app/modules/notifications/pages/NotificationsPage.tsx

import { useFeature } from '~/hooks/useFeature';

export function NotificationsPage() {
  // ✅ Check if email notifications are enabled
  const emailEnabled = useFeature('emailNotifications');

  return (
    <div>
      <h1>Notifications Settings</h1>

      {emailEnabled ? (
        <div>
          <h2>📧 Email Notifications</h2>
          <p>Configure your email notification preferences</p>
          {/* Email notification settings form */}
        </div>
      ) : (
        <p>Email notifications are not available yet</p>
      )}
    </div>
  );
}
```

### Method 2: Using Component (Cleaner)

```typescript
// File: app/modules/notifications/pages/NotificationsPage.tsx

import { FeatureGate } from '~/components/FeatureFlags/FeatureGate';

export function NotificationsPage() {
  return (
    <div>
      <h1>Notifications Settings</h1>

      {/* ✅ Show only if emailNotifications is enabled */}
      <FeatureGate feature="emailNotifications">
        <div>
          <h2>📧 Email Notifications</h2>
          <p>Configure your email notification preferences</p>
          {/* Email notification settings form */}
        </div>
      </FeatureGate>

      {/* ✅ Show fallback if not enabled */}
      <FeatureGate
        feature="emailNotifications"
        fallback={<p>Email notifications are not available yet</p>}
      >
        {/* Content */}
      </FeatureGate>
    </div>
  );
}
```

### Method 3: Using Feature Config

```typescript
// File: app/modules/notifications/services/emailService.ts

import { useFeatureConfig } from '~/hooks/useFeature';

export function EmailNotificationSetup() {
  // ✅ Get the feature configuration
  const config = useFeatureConfig('emailNotifications');

  return (
    <div>
      <h3>Email Notification Settings</h3>
      <p>Max emails per day: {config?.maxEmailsPerDay}</p>
      <p>Schedule: {config?.scheduleType}</p>
      <p>Types: {config?.notificationType?.join(', ')}</p>
    </div>
  );
}
```

### Method 4: Using Direct Manager (Advanced)

```typescript
// File: app/modules/notifications/hooks/useNotifications.ts

import { featureFlagManager } from '~/utils/featureFlags';

export function useNotifications() {
  const isEnabled = featureFlagManager.isEnabled('emailNotifications');
  const config = featureFlagManager.getConfig('emailNotifications');

  return {
    isEnabled,
    config,
    // Use in API calls, state, etc.
  };
}
```

---

## 🎛️ Step 4: Enable/Disable a Feature Flag

### Location 1: Enable/Disable Manually in Code

```typescript
// File: app/utils/featureFlags.ts

export const FEATURE_FLAGS: FeatureFlags = {
  emailNotifications: {
    name: 'emailNotifications',
    enabled: true, // ← CHANGE HERE to enable
    // OR
    enabled: false, // ← CHANGE HERE to disable
    description: 'Send email notifications to vendors',
    // ... rest of config
  },
};
```

### Location 2: Increase/Decrease Rollout Percentage

```typescript
// File: app/utils/featureFlags.ts

export const FEATURE_FLAGS: FeatureFlags = {
  emailNotifications: {
    name: 'emailNotifications',
    enabled: true,

    // ← CHANGE ROLLOUT PERCENTAGE HERE
    rolloutPercentage: 10, // 10% rollout (testing with some users)
    // OR
    rolloutPercentage: 50, // 50% rollout (half the users)
    // OR
    rolloutPercentage: 100, // 100% rollout (everyone)

    description: 'Send email notifications to vendors',
  },
};
```

### Location 3: Limit to Specific Environments

```typescript
// File: app/utils/featureFlags.ts

export const FEATURE_FLAGS: FeatureFlags = {
  emailNotifications: {
    name: 'emailNotifications',
    enabled: true,

    // ← CHANGE TARGET ENVIRONMENTS HERE
    targetEnvironments: ['development'], // Dev only
    // OR
    targetEnvironments: ['staging'], // Staging only
    // OR
    targetEnvironments: ['staging', 'production'], // Staging + Production
    // OR
    targetEnvironments: ['development', 'staging', 'production'], // Everywhere

    description: 'Send email notifications to vendors',
  },
};
```

### Location 4: Update Feature Configuration

```typescript
// File: app/utils/featureFlags.ts

export const FEATURE_FLAGS: FeatureFlags = {
  emailNotifications: {
    name: 'emailNotifications',
    enabled: true,
    description: 'Send email notifications to vendors',

    // ← CHANGE CONFIG HERE
    config: {
      sendNotifications: true, // Enable/disable sending
      notificationType: ['reminder'], // Add/remove types
      scheduleType: 'delayed', // Change schedule
      maxEmailsPerDay: 500, // Increase limit
    },
  },
};
```

---

## 🚀 Complete Example: Adding & Using Email Notifications

### Step 1: Define the Flag

```typescript
// File: app/utils/featureFlags.ts

export const FEATURE_FLAGS: FeatureFlags = {
  emailNotifications: {
    name: 'emailNotifications',
    enabled: false, // Start disabled
    description: 'Send email notifications to vendors',
    rolloutPercentage: 0,
    targetEnvironments: ['development'],
    config: {
      sendNotifications: true,
      notificationType: ['reminder', 'alert'],
      scheduleType: 'immediate',
      maxEmailsPerDay: 100,
    },
    dependencies: ['notificationSystem'],
  },
};
```

### Step 2: Use in Component

```typescript
// File: app/modules/notifications/pages/NotificationsPage.tsx

import { FeatureGate } from '~/components/FeatureFlags/FeatureGate';
import { useFeature, useFeatureConfig } from '~/hooks/useFeature';

export function NotificationsPage() {
  const emailEnabled = useFeature('emailNotifications');
  const emailConfig = useFeatureConfig('emailNotifications');

  return (
    <div className="space-y-6">
      <h1>📧 Notification Settings</h1>

      {/* Show email settings only if enabled */}
      <FeatureGate
        feature="emailNotifications"
        fallback={<p>Email notifications are not available in your region yet.</p>}
      >
        <div className="card p-6">
          <h2>Email Notifications</h2>

          <div className="space-y-4">
            <div>
              <label>
                <input type="checkbox" defaultChecked={emailConfig?.sendNotifications} />
                Enable email notifications
              </label>
            </div>

            <div>
              <label>Schedule:</label>
              <select defaultValue={emailConfig?.scheduleType}>
                <option>Immediate</option>
                <option>Daily Digest</option>
                <option>Weekly Digest</option>
              </select>
            </div>

            <div>
              <p>Max emails per day: {emailConfig?.maxEmailsPerDay}</p>
            </div>

            <button className="btn btn-primary">Save Settings</button>
          </div>
        </div>
      </FeatureGate>
    </div>
  );
}
```

### Step 3: Enable the Feature

```typescript
// File: app/utils/featureFlags.ts

export const FEATURE_FLAGS: FeatureFlags = {
  emailNotifications: {
    name: 'emailNotifications',
    enabled: true, // ← ENABLE IT
    rolloutPercentage: 25, // ← Start with 25% rollout
    targetEnvironments: ['staging', 'production'], // ← Available everywhere
    // ... rest of config
  },
};
```

### Step 4: Gradually Rollout

```typescript
// Week 1: Test with 25% of users
enabled: true,
rolloutPercentage: 25,

// Week 2: Increase to 50%
rolloutPercentage: 50,

// Week 3: Increase to 75%
rolloutPercentage: 75,

// Week 4: Full rollout to 100%
rolloutPercentage: 100,

// Or disable if issues
enabled: false,
rolloutPercentage: 0,
```

---

## 🎯 Common Use Cases

### Use Case 1: Beta Testing a Feature

```typescript
betaFeature: {
  name: 'betaFeature',
  enabled: true,
  rolloutPercentage: 25,  // Only 25% of users see it
  targetEnvironments: ['staging', 'production'],
  description: 'Beta testing new feature with limited users',
  config: {
    betaTesters: ['user1', 'user2', 'user3']
  }
}
```

### Use Case 2: A/B Testing

```typescript
abtestFeature: {
  name: 'abTestNewUI',
  enabled: true,
  rolloutPercentage: 50,  // 50% see new UI, 50% see old UI
  description: 'A/B test new user interface',
  config: {
    variant: 'new'
  }
}
```

### Use Case 3: Feature with Dependencies

```typescript
advancedReporting: {
  name: 'advancedReporting',
  enabled: true,
  description: 'Advanced reporting dashboard',
  dependencies: ['vendorManagement', 'vendorTracking'],
  // Won't work without these features enabled
}
```

### Use Case 4: Environment-Specific Feature

```typescript
developmentTools: {
  name: 'developmentTools',
  enabled: true,
  description: 'Developer tools and debugging utilities',
  targetEnvironments: ['development'],  // Only in dev!
  // Production won't see this
}
```

### Use Case 5: Temporary Feature (with expiration)

```typescript
holidaySale: {
  name: 'holidaySale',
  enabled: true,
  description: 'Holiday sale banner and discounts',
  expiresAt: '2026-12-26',  // Auto-remove after holiday
  config: {
    discountPercentage: 20
  }
}
```

---

## 📊 All Places to Modify Feature Flags

### File 1: `app/utils/featureFlags.ts` (Main Configuration)

```typescript
// Location: Line ~25-115
export const FEATURE_FLAGS: FeatureFlags = {
  yourFeature: {
    enabled: true,           // ← Enable/Disable here
    rolloutPercentage: 100,  // ← Change rollout here
    targetEnvironments: [...],  // ← Change environments here
    config: {...},           // ← Change settings here
  }
};
```

### File 2: `.env` file (Environment Variables)

```bash
# Optional: Override flags via environment
VITE_ENABLE_EMAIL_NOTIFICATIONS=true
VITE_ROLLOUT_PERCENTAGE=50
VITE_APP_ENV=staging
```

### File 3: `app/main.tsx` (Initialization)

```typescript
// Location: Line ~20-30
const featureFlagManager = new FeatureFlagManager(
  FEATURE_FLAGS,
  (import.meta.env.VITE_APP_ENV as any) || 'development'
);
```

### File 4: Module Config (Feature Registration)

```typescript
// File: app/modules/opportunities/module.config.ts
export const opportunitiesModuleConfig: ModuleConfig = {
  featureFlag: 'jobPostings', // ← Link to feature flag
  // Module only loads if jobPostings is enabled
};
```

---

## 🔍 How Feature Flags Work - Detailed Flow

### Complete Flow Diagram

```
1. USER VISITS APP
   └─ app/main.tsx loads

2. FEATURE FLAG MANAGER INITIALIZED
   └─ Reads FEATURE_FLAGS from app/utils/featureFlags.ts
      └─ Creates FeatureFlagManager instance

3. MODULE SYSTEM LOADS
   └─ Checks feature flags
   └─ Only loads modules with enabled flags
      ├─ jobPostings: enabled? → load opportunities module
      ├─ vendorBilling: disabled? → skip
      └─ authentication: enabled? → always load

4. ROUTE COMPONENT RENDERS
   └─ <FeatureGate feature="jobPostings">
      └─ Is jobPostings enabled? → Show component
      └─ Is jobPostings disabled? → Show fallback or nothing

5. USER SEES CONTENT
   └─ Based on feature flag status
```

---

## 🧪 Testing Feature Flags

### Test: Is Feature Enabled?

```typescript
import { featureFlagManager } from '~/utils/featureFlags';

// Test in browser console
featureFlagManager.isEnabled('emailNotifications');
// Returns: true or false
```

### Test: Get Feature Config

```typescript
featureFlagManager.getConfig('emailNotifications');
// Returns: { sendNotifications: true, maxEmailsPerDay: 100, ... }
```

### Test: Get All Enabled Features

```typescript
featureFlagManager.getEnabledFeatures();
// Returns: ['authentication', 'vendorManagement', 'jobPostings', ...]
```

---

## ⚠️ Important Rules

### ✅ DO:

- ✅ Start with `enabled: false` for new features
- ✅ Use small `rolloutPercentage` (25%, 50%) for gradual rollout
- ✅ Always define `description` for clarity
- ✅ Use `dependencies` if your feature needs others
- ✅ Set `expiresAt` for temporary features
- ✅ Test with `featureFlagManager.isEnabled()` in console

### ❌ DON'T:

- ❌ Remove flags from config (just set `enabled: false`)
- ❌ Deploy without testing with rollout percentages
- ❌ Force `rolloutPercentage: 100` on day 1
- ❌ Forget to update `targetEnvironments` for production
- ❌ Leave expired features in the config
- ❌ Use `enabled: true` without testing first

---

## 🔄 Typical Feature Lifecycle

```
Day 1: Development
├─ enabled: true
├─ rolloutPercentage: 0 (no one sees it)
└─ targetEnvironments: ['development']

Day 5: Testing
├─ rolloutPercentage: 25
└─ targetEnvironments: ['staging']

Day 10: Beta
├─ rolloutPercentage: 50
└─ targetEnvironments: ['staging', 'production']

Day 15: Wide Rollout
├─ rolloutPercentage: 75
└─ targetEnvironments: ['production']

Day 20: Full Release
├─ rolloutPercentage: 100
└─ targetEnvironments: ['production']

Day 60: Stable (remove flag)
└─ Feature no longer needs flag (just use normally)
```

---

## 📚 Quick Reference Checklist

### To Create a Feature Flag:

- [ ] Choose a unique name
- [ ] Write description
- [ ] Set `enabled: false` initially
- [ ] Set `rolloutPercentage: 0`
- [ ] Add to `FEATURE_FLAGS` in `app/utils/featureFlags.ts`

### To Enable a Feature Flag:

- [ ] Change `enabled: true`
- [ ] Set `rolloutPercentage` (start with 0-25%)
- [ ] Set `targetEnvironments` (dev/staging/prod)
- [ ] Save file (no deployment needed)
- [ ] Features update automatically

### To Disable a Feature Flag:

- [ ] Change `enabled: false`
- [ ] Set `rolloutPercentage: 0`
- [ ] Remove from `targetEnvironments`
- [ ] Save file (no deployment needed)
- [ ] Features hide automatically

### To Use in Component:

- [ ] Import: `import { useFeature } from '~/hooks/useFeature'`
- [ ] Or: `import { FeatureGate } from '~/components/FeatureFlags/FeatureGate'`
- [ ] Check: `useFeature('flagName')`
- [ ] Wrap: `<FeatureGate feature="flagName">...</FeatureGate>`

---

## 🎓 Summary

| Task                     | How                               | Where                       |
| ------------------------ | --------------------------------- | --------------------------- |
| **Create Flag**          | Add to FEATURE_FLAGS object       | `app/utils/featureFlags.ts` |
| **Enable Flag**          | Set `enabled: true`               | `app/utils/featureFlags.ts` |
| **Disable Flag**         | Set `enabled: false`              | `app/utils/featureFlags.ts` |
| **Gradual Rollout**      | Change `rolloutPercentage`        | `app/utils/featureFlags.ts` |
| **Limit to Environment** | Change `targetEnvironments`       | `app/utils/featureFlags.ts` |
| **Use in Component**     | `useFeature()` or `<FeatureGate>` | Any component file          |
| **Check in Console**     | `featureFlagManager.isEnabled()`  | Browser developer tools     |

---

**Everything in ONE file**: `app/utils/featureFlags.ts` 🎉

---

_This guide covers everything you need to master feature flags!_

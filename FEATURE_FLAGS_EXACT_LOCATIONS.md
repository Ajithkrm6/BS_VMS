#!/usr/bin/null

# 🎯 Feature Flags - Exact Locations & Code Examples

Quick visual guide showing EXACTLY where to make changes with line numbers and code.

---

## 🗺️ Map of All Feature Flag Files

```
BS-VMS Project
│
├─ 📝 app/utils/featureFlags.ts
│  └─ ⭐ MAIN FILE - Define & Configure all flags here
│
├─ 🎣 app/hooks/useFeature.ts
│  └─ How to access flags in components
│
├─ 🧩 app/components/FeatureFlags/FeatureGate.tsx
│  └─ Components to conditionally render based on flags
│
├─ 📦 app/modules/*/module.config.ts
│  └─ Link modules to feature flags
│
└─ .env / .env.example
   └─ Environment-specific overrides
```

---

## 📝 File 1: Define Flags → `app/utils/featureFlags.ts`

### EXACTLY What This File Contains

```typescript
// ═══════════════════════════════════════════════════════════════
// Lines 1-20: Type Definitions
// ═══════════════════════════════════════════════════════════════

export type FeatureFlagValue = boolean | string | number | Record<string, unknown> | string[];

export interface FeatureFlag {
  name: string;
  enabled: boolean;
  description: string;
  rolloutPercentage?: number;
  targetEnvironments?: ('development' | 'staging' | 'production')[];
  config?: Record<string, FeatureFlagValue>;
  dependencies?: string[];
  createdAt?: string;
  expiresAt?: string;
}

// ═══════════════════════════════════════════════════════════════
// Lines 25-115: FEATURE_FLAGS Configuration ⭐ EDIT HERE ⭐
// ═══════════════════════════════════════════════════════════════

export const FEATURE_FLAGS: FeatureFlags = {
  // Each feature is an object here
  yourFeatureName: {
    name: 'yourFeatureName',
    enabled: true,  // ← SET TO true/false HERE
    description: 'What does this feature do?',
    rolloutPercentage: 100,  // ← CHANGE ROLLOUT % HERE
    targetEnvironments: ['development', 'staging', 'production'],  // ← CHOOSE ENVS HERE
    config: {
      // ← ADD FEATURE SETTINGS HERE
      setting1: 'value',
      setting2: true
    }
  }
};

// ═══════════════════════════════════════════════════════════════
// Lines 120-200: FeatureFlagManager Class
// ═══════════════════════════════════════════════════════════════

export class FeatureFlagManager {
  isEnabled(featureName: string): boolean { ... }
  getConfig(featureName: string): Record<string, FeatureFlagValue> { ... }
  getEnabledFeatures(): string[] { ... }
  setUserIdentifier(userId: string): void { ... }
}

// ═══════════════════════════════════════════════════════════════
// End of file: Export Manager Instance
// ═══════════════════════════════════════════════════════════════

export const featureFlagManager = new FeatureFlagManager(FEATURE_FLAGS, 'development');
```

---

## ✏️ Example 1: Add a New Feature Flag (Email Notifications)

### Current State (Before)

```typescript
// app/utils/featureFlags.ts - Lines 90-115

export const FEATURE_FLAGS: FeatureFlags = {
  // ... other flags ...

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
}; // ← Ends here
```

### Code to Add (After)

```typescript
// app/utils/featureFlags.ts - ADD AFTER LINE 113

export const FEATURE_FLAGS: FeatureFlags = {
  // ... other flags ...

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

  // ✅ ADD THIS NEW FLAG:
  emailNotifications: {
    name: 'emailNotifications',
    enabled: false, // Start disabled
    description: 'Send email notifications to vendors',
    rolloutPercentage: 0, // 0% = no rollout yet
    targetEnvironments: ['development'], // Dev only
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

---

## 🔄 Example 2: Enable a Feature Flag

### Current State (Flag is Disabled)

```typescript
// app/utils/featureFlags.ts - Lines 65-72

emailNotifications: {
  name: 'emailNotifications',
  enabled: false,  // ← DISABLED
  description: 'Send email notifications to vendors',
  rolloutPercentage: 0,
  targetEnvironments: ['development'],
  // ...
},
```

### Change To (Enable It)

```typescript
// app/utils/featureFlags.ts - Lines 65-72

emailNotifications: {
  name: 'emailNotifications',
  enabled: true,   // ← ✅ ENABLED
  description: 'Send email notifications to vendors',
  rolloutPercentage: 25,  // ← Gradual rollout
  targetEnvironments: ['staging', 'production'],  // ← More environments
  // ...
},
```

---

## 📊 Example 3: Gradual Rollout (Phase It In)

### Phase 1: Testing (Week 1)

```typescript
// app/utils/featureFlags.ts

emailNotifications: {
  name: 'emailNotifications',
  enabled: true,
  rolloutPercentage: 10,  // ← Only 10% of users see it
  targetEnvironments: ['development'],
  // ...
},
```

### Phase 2: Wider Testing (Week 2)

```typescript
// app/utils/featureFlags.ts

emailNotifications: {
  name: 'emailNotifications',
  enabled: true,
  rolloutPercentage: 25,  // ← 25% of users
  targetEnvironments: ['staging'],  // ← Staging env
  // ...
},
```

### Phase 3: Production Testing (Week 3)

```typescript
// app/utils/featureFlags.ts

emailNotifications: {
  name: 'emailNotifications',
  enabled: true,
  rolloutPercentage: 50,  // ← 50% of users (A/B test)
  targetEnvironments: ['staging', 'production'],
  // ...
},
```

### Phase 4: Full Release (Week 4)

```typescript
// app/utils/featureFlags.ts

emailNotifications: {
  name: 'emailNotifications',
  enabled: true,
  rolloutPercentage: 100,  // ← Everyone sees it
  targetEnvironments: ['development', 'staging', 'production'],
  // ...
},
```

---

## 🎣 File 2: Use Flags in Components → `app/hooks/useFeature.ts`

### What Hooks Are Available

```typescript
// app/hooks/useFeature.ts

// ✅ Check if feature is enabled
import { useFeature } from '~/hooks/useFeature';
const isEnabled = useFeature('emailNotifications');  // true or false

// ✅ Get feature configuration
import { useFeatureConfig } from '~/hooks/useFeature';
const config = useFeatureConfig('emailNotifications');  // { ...config }

// ✅ Get all enabled features
import { useEnabledFeatures } from '~/hooks/useFeature';
const enabled = useEnabledFeatures();  // ['auth', 'jobPostings', ...]

// ✅ Set user for consistent rollout
import { useSetFeatureFlagUser } from '~/hooks/useFeature';
useSetFeatureFlagUser(userId);

// ✅ Conditionally render based on flag
import { useFeatureRender } from '~/hooks/useFeature';
useFeatureRender('emailNotifications', <Content />, <Fallback />);
```

### Example: Using in a Component

```typescript
// File: app/modules/notifications/pages/NotificationsPage.tsx

import { useFeature, useFeatureConfig } from '~/hooks/useFeature';

export function NotificationsPage() {
  // ✅ Line 1: Check if enabled
  const emailEnabled = useFeature('emailNotifications');

  // ✅ Line 2: Get config if enabled
  const emailConfig = useFeatureConfig('emailNotifications');

  // ✅ Line 3: Use in component
  if (!emailEnabled) {
    return <p>Email notifications are not available</p>;
  }

  return (
    <div>
      <h2>Email Notifications</h2>
      <p>Max per day: {emailConfig?.maxEmailsPerDay}</p>
      <p>Schedule: {emailConfig?.scheduleType}</p>
    </div>
  );
}
```

---

## 🧩 File 3: Conditional Components → `app/components/FeatureFlags/FeatureGate.tsx`

### FeatureGate Component Usage

```typescript
// Option 1: Show if enabled, hide if disabled
import { FeatureGate } from '~/components/FeatureFlags/FeatureGate';

<FeatureGate feature="emailNotifications">
  <div>
    <h2>Email Notifications</h2>
    <p>Your email notification settings</p>
  </div>
</FeatureGate>


// Option 2: Show fallback if disabled
<FeatureGate
  feature="emailNotifications"
  fallback={<p>Feature not available yet</p>}
>
  <div>
    <h2>Email Notifications</h2>
    <p>Your email notification settings</p>
  </div>
</FeatureGate>


// Option 3: Multiple features (AND logic - all must be enabled)
import { MultiFeatureGate } from '~/components/FeatureFlags/FeatureGate';

<MultiFeatureGate features={['emailNotifications', 'notificationSystem']} logic="AND">
  <div>Both features are enabled</div>
</MultiFeatureGate>


// Option 4: Multiple features (OR logic - at least one must be enabled)
<MultiFeatureGate features={['emailNotifications', 'smsNotifications']} logic="OR">
  <div>At least one notification type is enabled</div>
</MultiFeatureGate>
```

---

## 📦 File 4: Link to Modules → `app/modules/*/module.config.ts`

### Example: Opportunities Module

```typescript
// File: app/modules/opportunities/module.config.ts

import { lazy } from 'react';
import type { ModuleConfig } from '~/utils/moduleRegistry';

export const opportunitiesModuleConfig: ModuleConfig = {
  name: 'opportunities',
  version: '1.0.0',

  // ✅ LINK TO FEATURE FLAG HERE:
  featureFlag: 'jobPostings', // ← Must match flag name in FEATURE_FLAGS

  description: 'Job postings and career opportunities',
  dependencies: ['core'],

  routes: [
    {
      path: '/opportunities',
      name: 'Opportunities',
      component: lazy(() => import('./pages/OpportunitiesPage')),
      icon: '💼',
      order: 4,
    },
  ],

  stores: [
    {
      name: 'opportunities',
      reducer: opportunitiesReducer,
    },
  ],
};
```

### How It Works

```
1. Module config references: featureFlag: 'jobPostings'
2. App checks feature flag
3. If 'jobPostings' enabled: ✅ Load module
4. If 'jobPostings' disabled: ❌ Don't load module
```

---

## 🔧 Testing in Browser Console

### Test Any Feature Flag

```javascript
// Open browser DevTools → Console

// ✅ Check if a flag is enabled
featureFlagManager.isEnabled('emailNotifications');
// Returns: true or false

// ✅ Get all enabled features
featureFlagManager.getEnabledFeatures();
// Returns: ['authentication', 'jobPostings', 'vendorManagement', ...]

// ✅ Get feature configuration
featureFlagManager.getConfig('emailNotifications');
// Returns: { sendNotifications: true, maxEmailsPerDay: 100, ... }
```

---

## 📋 Complete Checklist: Add & Enable a Feature

### Step 1: Add to FEATURE_FLAGS ✅

```typescript
// File: app/utils/featureFlags.ts
// Location: Inside FEATURE_FLAGS object (around line 25-115)

yourNewFeature: {
  name: 'yourNewFeature',
  enabled: false,
  description: 'What this does',
  rolloutPercentage: 0,
  targetEnvironments: ['development'],
  config: { /* settings */ },
  dependencies: []
},
```

### Step 2: Use in Component ✅

```typescript
// File: Your component file
import { useFeature } from '~/hooks/useFeature';

const isEnabled = useFeature('yourNewFeature');
if (isEnabled) {
  // Show feature
}
```

### Step 3: Enable the Flag ✅

```typescript
// File: app/utils/featureFlags.ts
// Change: enabled: true
// Change: rolloutPercentage to 25, 50, 75, or 100
// Change: targetEnvironments to ['staging', 'production']
```

### Step 4: Test in Console ✅

```javascript
// Browser console
featureFlagManager.isEnabled('yourNewFeature'); // Should be true
```

---

## 🚨 Common Mistakes & How to Fix

### ❌ Mistake 1: Wrong Flag Name

```typescript
// WRONG: typo in flag name
useFeature('emailNotfications'); // ← typo: "Notfications"

// CORRECT: exact name as defined
useFeature('emailNotifications'); // ← correct name
```

### ❌ Mistake 2: Module Won't Load

```typescript
// WRONG: featureFlag name doesn't match
featureFlag: 'email',

// CORRECT: match exactly
featureFlag: 'emailNotifications',
```

### ❌ Mistake 3: Flag Doesn't Appear

```typescript
// WRONG: duplicate flag name
export const FEATURE_FLAGS = {
  email: { ... },
  email: { ... }  // ← Can't have two with same name!
}

// CORRECT: unique names
export const FEATURE_FLAGS = {
  emailNotifications: { ... },
  emailReminders: { ... }  // ← Different name
}
```

### ❌ Mistake 4: Changes Don't Take Effect

```
WRONG: Forgot to save file
CORRECT: File saved automatically → Restart dev server

// In terminal:
npm run dev  // This reloads the flags
```

---

## 🎯 Quick Reference Table

### Places to Make Changes

| Change               | File                             | Lines  | What to Edit                          |
| -------------------- | -------------------------------- | ------ | ------------------------------------- |
| **Add Flag**         | `app/utils/featureFlags.ts`      | 25-115 | Add new object to `FEATURE_FLAGS`     |
| **Enable Flag**      | `app/utils/featureFlags.ts`      | varies | Set `enabled: true`                   |
| **Disable Flag**     | `app/utils/featureFlags.ts`      | varies | Set `enabled: false`                  |
| **Rollout %**        | `app/utils/featureFlags.ts`      | varies | Change `rolloutPercentage`            |
| **Environments**     | `app/utils/featureFlags.ts`      | varies | Change `targetEnvironments`           |
| **Settings**         | `app/utils/featureFlags.ts`      | varies | Update `config` object                |
| **Use in Component** | Any component file               | any    | Use `useFeature()` or `<FeatureGate>` |
| **Link to Module**   | `app/modules/*/module.config.ts` | varies | Set `featureFlag: 'flagName'`         |

---

## 📚 Summary

### ONE File to Rule Them All

```
⭐ app/utils/featureFlags.ts ⭐
    └─ EVERYTHING happens here
    └─ Define flags
    └─ Enable/disable flags
    └─ Set rollout %
    └─ Configure settings
```

### Everything Else Just Uses It

```
app/hooks/useFeature.ts
  └─ Reads from featureFlags.ts

app/components/FeatureFlags/FeatureGate.tsx
  └─ Reads from featureFlags.ts

app/modules/*/module.config.ts
  └─ References flags from featureFlags.ts

Your components
  └─ Check flags from featureFlags.ts
```

---

## 🚀 Next Steps

1. ✅ Read `FEATURE_FLAGS_COMPLETE_GUIDE.md`
2. ✅ Open `app/utils/featureFlags.ts`
3. ✅ Add a new flag (following examples above)
4. ✅ Enable it in a component with `useFeature()`
5. ✅ Test in browser console with `featureFlagManager.isEnabled()`
6. ✅ Gradually rollout using `rolloutPercentage`

---

**Happy flag managing! 🚩**

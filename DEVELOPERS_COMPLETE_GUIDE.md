# 📚 Complete Guide to BS-VMS: Feature Flags & Modular Architecture

**This guide is for EVERYONE - from juniors to seniors!**

---

## 📋 Table of Contents

1. [Architecture Overview](#architecture-overview)
2. [Feature Flags Explained](#feature-flags-explained)
3. [Module System Explained](#module-system-explained)
4. [Step-by-Step: Enable a Feature](#step-by-step-enable-feature)
5. [Step-by-Step: Create a New Module](#step-by-step-create-module)
6. [Common Patterns](#common-patterns)
7. [Best Practices](#best-practices)
8. [Troubleshooting](#troubleshooting)
9. [Scaling Guide](#scaling-guide)
10. [FAQs](#faqs)

---

# 🏗️ Architecture Overview

## What is BS-VMS?

BS-VMS is a **Vendor Management System** built with:

- **React** - UI framework
- **Redux** - State management
- **TanStack Query** - Server data management
- **Feature Flags** - Turn features on/off
- **Modules** - Independent feature packages

## Why This Architecture?

### Problem It Solves

- ❌ **Old Way**: Deploy entire application → all users get all features → risk if bugs
- ✅ **New Way**: Deploy → enable features gradually → test with % of users → rollout safely

### Real-World Scenario

Imagine you're building a reporting feature:

**Without Feature Flags:**

```
Week 1: Code reporting feature
Week 2: Push to production
Week 3: CRASH! 🔥 Users angry, emergency patch needed
```

**With Feature Flags:**

```
Week 1: Code reporting feature (DISABLED by default)
Week 2: Push to production
Week 3: Enable for 5% users, monitor for errors
Week 4: Enable for 25% users, if all good
Week 5: Enable for 100% users ✅
```

### 3 Core Concepts

#### 1. **Feature Flags** (Simple On/Off Switches)

```
🟢 Enabled  = Feature is active
🔴 Disabled = Feature is hidden
```

#### 2. **Modules** (Independent Features)

```
Each module is like a separate mini-app:
- Has its own components
- Has its own routes
- Has its own data management
- Can be turned on/off independently
```

#### 3. **Rollout Percentage** (Gradual Release)

```
0%   = Nobody sees it
25%  = 1 out of 4 random users see it
50%  = Half of users see it
100% = Everyone sees it
```

---

# 🚩 Feature Flags Explained (Simple Version)

## What is a Feature Flag?

**Simple Explanation:**
A feature flag is a switch in your code that says:

- "If this flag is ON, show this feature"
- "If this flag is OFF, don't show this feature"

**Real Example:**

```typescript
// Without Feature Flag (RISKY)
export function Dashboard() {
  return (
    <div>
      <h1>Dashboard</h1>
      <AdvancedReports />  {/* Always shows - risky! */}
    </div>
  );
}

// With Feature Flag (SAFE)
export function Dashboard() {
  const isReportingEnabled = useFeature('advancedReporting');

  return (
    <div>
      <h1>Dashboard</h1>
      {isReportingEnabled && <AdvancedReports />}  {/* Only shows if enabled */}
    </div>
  );
}
```

## Feature Flag Configuration

Every flag is defined in `app/utils/featureFlags.ts`:

```typescript
export const FEATURE_FLAGS = {
  // Name of the feature
  advancedReporting: {
    name: 'advancedReporting', // Internal ID
    enabled: true, // Is it on or off?
    description: 'Advanced analytics', // What does it do?
    rolloutPercentage: 50, // Roll out to 50% of users
    targetEnvironments: ['production'], // Only in production
    config: {
      maxReports: 100, // Feature-specific settings
      exportFormats: ['pdf', 'excel'],
    },
    dependencies: ['vehicleManagement'], // Needs vehicle feature
  },
};
```

## How Rollout Percentage Works

```
Let's say you have 100 users and set rolloutPercentage: 50

User 1: ID = "user_1" → Hash = 45 → 45% < 50% → ✅ Feature ON
User 2: ID = "user_2" → Hash = 72 → 72% > 50% → ❌ Feature OFF
User 3: ID = "user_3" → Hash = 23 → 23% < 50% → ✅ Feature ON
...

Key: Same user always gets same result (consistent)
```

**Real-World Usage:**

```
100 users total:
- 50 users see the new feature (testing)
- 50 users don't see it (control group)
- Compare metrics between both groups
- If good → increase to 75%
- If bad → decrease to 0% (rollback)
```

---

# 🧩 Module System Explained (Simple Version)

## What is a Module?

**Simple Explanation:**
A module is a self-contained package that includes everything needed for ONE feature:

- UI components
- Routes (navigation)
- Data storage (Redux)
- API calls

**Visual Representation:**

```
BS-VMS Application
│
├── Core Module (Always On)
│   ├── Components: Login, Navbar
│   ├── Routes: /login
│   └── Services: Authentication
│
├── Vehicles Module (Can be On/Off)
│   ├── Components: VehicleList, VehicleForm
│   ├── Routes: /vehicles, /vehicles/:id
│   ├── Redux: vehicleSlice
│   └── Services: vehicleAPI
│
├── Maintenance Module (Can be On/Off)
│   ├── Components: MaintenanceList
│   ├── Routes: /maintenance
│   ├── Redux: maintenanceSlice
│   └── Services: maintenanceAPI
│
├── Reporting Module (Can be On/Off)
│   ├── Components: ReportDashboard, Charts
│   ├── Routes: /reports
│   ├── Redux: reportingSlice
│   └── Services: reportingAPI
│
└── Notifications Module (Can be On/Off)
    ├── Components: NotificationBell
    ├── Redux: notificationSlice
    └── Services: notificationAPI
```

## Module Folder Structure

Each module follows the same structure:

```
app/modules/vehicles/
├── module.config.ts              ← Configuration (what to load)
├── components/                   ← React components
│   ├── VehicleList.tsx
│   ├── VehicleForm.tsx
│   └── VehicleCard.tsx
├── pages/                        ← Full page components
│   └── VehiclesPage.tsx
├── stores/                       ← Redux slices
│   └── vehicleSlice.ts
├── services/                     ← API calls
│   └── vehicleAPI.ts
├── types/                        ← TypeScript types
│   └── vehicle.ts
└── hooks/                        ← Custom hooks
    └── useVehicles.ts
```

## Module Benefits

### ✅ Benefits

| Benefit          | Reason                                          |
| ---------------- | ----------------------------------------------- |
| **Isolation**    | Each team works on their module independently   |
| **Testability**  | Test modules without other modules              |
| **Scalability**  | Add new features without touching existing code |
| **Reusability**  | Module components can be used elsewhere         |
| **Easy Disable** | One flag disables entire feature safely         |
| **Faster CI/CD** | Deploy safely with gradual rollout              |
| **Debugging**    | Find bugs in isolated module easily             |

### ✅ Real-World Example: Reporting Module

**Without Modules (Complicated):**

```
app/
├── components/
│   ├── ReportDashboard.tsx          ← Where is it used?
│   ├── ChartComponent.tsx            ← Dependency not clear
│   └── ReportForm.tsx
├── stores/
│   ├── vehicleSlice.ts
│   ├── maintenanceSlice.ts
│   └── reportingSlice.ts             ← Hard to remove
└── services/
    ├── vehicleAPI.ts
    └── reportingAPI.ts               ← Dependency not clear
```

**With Modules (Clean):**

```
app/modules/reporting/             ← Everything is here!
├── module.config.ts
├── components/
│   ├── ReportDashboard.tsx
│   ├── ChartComponent.tsx
│   └── ReportForm.tsx
├── stores/
│   └── reportingSlice.ts           ← Only reporting
└── services/
    └── reportingAPI.ts              ← Only reporting
```

To disable: Just disable the flag! ✅

---

# 🎯 Feature Flag Examples

## Example 1: Simple Check

**File: `app/utils/featureFlags.ts`**

```typescript
export const FEATURE_FLAGS = {
  darkMode: {
    name: 'darkMode',
    enabled: true,
    description: 'Dark mode theme support',
  },
};
```

**File: `app/components/ThemeToggle.tsx`**

```typescript
import { featureFlagManager } from '~/utils/featureFlags';

export function ThemeToggle() {
  const isDarkModeEnabled = featureFlagManager.isEnabled('darkMode');

  if (!isDarkModeEnabled) {
    return null; // Don't show toggle
  }

  return (
    <button>
      🌙 Toggle Dark Mode
    </button>
  );
}
```

**How It Works:**

1. Check if `darkMode` flag is enabled
2. If YES → Show dark mode button
3. If NO → Show nothing

## Example 2: With Component

**File: `app/components/Dashboard.tsx`**

```typescript
import { FeatureGate } from '@/FeatureFlags/FeatureGate';
import { AdvancedReports } from './AdvancedReports';

export function Dashboard() {
  return (
    <div>
      <h1>Dashboard</h1>

      {/* This section only shows if feature is enabled */}
      <FeatureGate feature="advancedReporting">
        <AdvancedReports />
      </FeatureGate>
    </div>
  );
}
```

**What Happens:**

- If `advancedReporting` is ON → Shows `<AdvancedReports />`
- If `advancedReporting` is OFF → Shows nothing

## Example 3: With Fallback

**File: `app/components/ExportButton.tsx`**

```typescript
import { FeatureGate } from '@/FeatureFlags/FeatureGate';

export function ExportButton() {
  return (
    <FeatureGate
      feature="exportFeature"
      fallback={<p className="text-gray-400">Export coming soon</p>}
    >
      <button className="bg-blue-600 text-white px-4 py-2">
        📥 Export Data
      </button>
    </FeatureGate>
  );
}
```

**What Happens:**

- If `exportFeature` is ON → Shows export button
- If `exportFeature` is OFF → Shows "Export coming soon"

---

# 📝 Step-by-Step: Enable a Feature

## Scenario: Enable Advanced Reporting

### Step 1: Check Feature Configuration

**File: `app/utils/featureFlags.ts`**

Look for the feature:

```typescript
advancedReporting: {
  name: 'advancedReporting',
  enabled: false,              ← Currently OFF
  description: 'Advanced analytics',
  rolloutPercentage: 50,       ← Start at 50%
  targetEnvironments: ['production']
}
```

### Step 2: Create `.env.local` File

**In project root, create `.env.local`:**

```env
# Copy from .env.example first
VITE_APP_ENV=development
VITE_FF_ADVANCED_REPORTING=true
VITE_FF_REPORTING_ROLLOUT=50
```

### Step 3: Restart Development Server

```bash
# Press Ctrl+C to stop current server
npm run dev
```

### Step 4: Check in Browser

```
http://localhost:5173
```

Your feature should now be visible!

### Step 5: Test It Works

1. Open browser developer tools (F12)
2. Open Console tab
3. Check if feature shows up:

```javascript
// In browser console:
// Check all enabled features
window.__featureFlags?.getEnabledFeatures();
// Output: ['authentication', 'vehicleManagement', 'maintenanceTracking', 'advancedReporting', ...]
```

### Step 6: Use Debug Panel

When `VITE_DEBUG_FEATURE_FLAGS=true`, you'll see:

- 🟢 Bottom-right corner debug panel
- Shows all features
- Shows their status
- Shows rollout percentage

---

# 🛠️ Step-by-Step: Create a New Module

## Scenario: Create "Fuel Tracking" Module

### Step 1: Create Folder Structure

Create this folder structure:

```
app/modules/vendorTracking/
├── module.config.ts
├── components/
│   ├── VendorMetrics.tsx
│   └── PerformanceChart.tsx
├── pages/
│   └── VendorTrackingPage.tsx
├── stores/
│   └── vendorTrackingSlice.ts
├── services/
│   └── vendorTrackingAPI.ts
└── types/
    └── vendorTracking.ts
```

**Commands to create folders:**

```bash
mkdir app/modules/fuelTracking
mkdir app/modules/fuelTracking/components
mkdir app/modules/fuelTracking/pages
mkdir app/modules/fuelTracking/stores
mkdir app/modules/fuelTracking/services
mkdir app/modules/fuelTracking/types
```

### Step 2: Create Feature Flag

**File: `app/utils/featureFlags.ts`**

Add to the `FEATURE_FLAGS` object:

```typescript
export const FEATURE_FLAGS = {
  // ... existing flags ...

  // NEW FLAG - Add this
  fuelTracking: {
    name: 'fuelTracking',
    enabled: false, // Start disabled
    description: 'Track vehicle fuel consumption',
    rolloutPercentage: 100, // Will enable for everyone
    targetEnvironments: ['development', 'staging', 'production'],
    config: {
      maxFuelsPerPage: 50,
      enableAnalytics: true,
    },
    dependencies: ['vehicleManagement'], // Requires vehicles module
  },
};
```

### Step 3: Create Type Definitions

**File: `app/modules/vendorTracking/types/vendorTracking.ts`**

```typescript
/**
 * Vendor tracking types
 */

export interface VendorMetric {
  id: string;
  vendorId: string;
  date: string;
  performanceScore: number;
  deliveryRate: number;
  qualityRating: number;
  responseTime: number;
  notes?: string;
}

export interface VendorSummary {
  totalVendors: number;
  averagePerformance: number;
  topPerformers: VendorMetric[];
  metrics: VendorMetric[];
}
```

### Step 4: Create API Service

**File: `app/modules/fuelTracking/services/fuelAPI.ts`**

```typescript
/**
 * Fuel API Service
 * Handles all fuel-related API calls
 */

export const fuelAPI = {
  /**
   * Get all fuel records for a vehicle
   * @param vehicleId - Vehicle ID
   * @returns Array of fuel records
   */
  async getFuels(vehicleId: string) {
    try {
      const response = await fetch(`/api/vehicles/${vehicleId}/fuels`);
      return await response.json();
    } catch (error) {
      console.error('Error fetching fuels:', error);
      throw error;
    }
  },

  /**
   * Add new fuel record
   * @param vehicleId - Vehicle ID
   * @param fuelData - Fuel record data
   * @returns Created fuel record
   */
  async addFuel(vehicleId: string, fuelData: any) {
    try {
      const response = await fetch(`/api/vehicles/${vehicleId}/fuels`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(fuelData),
      });
      return await response.json();
    } catch (error) {
      console.error('Error adding fuel:', error);
      throw error;
    }
  },

  /**
   * Delete fuel record
   * @param vehicleId - Vehicle ID
   * @param fuelId - Fuel record ID
   */
  async deleteFuel(vehicleId: string, fuelId: string) {
    try {
      const response = await fetch(`/api/vehicles/${vehicleId}/fuels/${fuelId}`, {
        method: 'DELETE',
      });
      return await response.json();
    } catch (error) {
      console.error('Error deleting fuel:', error);
      throw error;
    }
  },
};
```

### Step 5: Create Redux Slice

**File: `app/modules/fuelTracking/stores/fuelSlice.ts`**

```typescript
/**
 * Fuel Redux Slice
 * Manages fuel records state
 */

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { FuelRecord } from '../types/fuel';

interface FuelState {
  records: FuelRecord[];
  isLoading: boolean;
  error: string | null;
  selectedFuelId: string | null;
}

const initialState: FuelState = {
  records: [],
  isLoading: false,
  error: null,
  selectedFuelId: null,
};

export const fuelSlice = createSlice({
  name: 'fuel',
  initialState,
  reducers: {
    // Fetch started
    fetchFuelsStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },

    // Fetch succeeded
    fetchFuelsSuccess: (state, action: PayloadAction<FuelRecord[]>) => {
      state.records = action.payload;
      state.isLoading = false;
    },

    // Fetch failed
    fetchFuelsError: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    // Add new fuel record
    addFuelRecord: (state, action: PayloadAction<FuelRecord>) => {
      state.records.push(action.payload);
    },

    // Delete fuel record
    deleteFuelRecord: (state, action: PayloadAction<string>) => {
      state.records = state.records.filter((r) => r.id !== action.payload);
    },
  },
});

export const {
  fetchFuelsStart,
  fetchFuelsSuccess,
  fetchFuelsError,
  addFuelRecord,
  deleteFuelRecord,
} = fuelSlice.actions;

export default fuelSlice.reducer;
```

### Step 6: Create Components

**File: `app/modules/fuelTracking/components/FuelForm.tsx`**

```typescript
/**
 * Fuel Form Component
 * Form to add/edit fuel records
 */

import { useState } from 'react';
import { Button } from '@/Common/Button';
import { Input } from '@/Common/Input';

interface FuelFormProps {
  onSubmit: (data: any) => void;
  isLoading?: boolean;
}

export function FuelForm({ onSubmit, isLoading = false }: FuelFormProps) {
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    litersFilled: '',
    costPerLiter: '',
    odometerReading: '',
    notes: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({
      date: new Date().toISOString().split('T')[0],
      litersFilled: '',
      costPerLiter: '',
      odometerReading: '',
      notes: ''
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 border rounded">
      <h3 className="font-semibold">Add Fuel Record</h3>

      <Input
        label="Date"
        type="date"
        value={formData.date}
        onChange={(e) =>
          setFormData({ ...formData, date: e.target.value })
        }
        required
      />

      <Input
        label="Liters Filled"
        type="number"
        step="0.1"
        value={formData.litersFilled}
        onChange={(e) =>
          setFormData({ ...formData, litersFilled: e.target.value })
        }
        required
      />

      <Input
        label="Cost per Liter"
        type="number"
        step="0.01"
        value={formData.costPerLiter}
        onChange={(e) =>
          setFormData({ ...formData, costPerLiter: e.target.value })
        }
        required
      />

      <Input
        label="Odometer Reading"
        type="number"
        value={formData.odometerReading}
        onChange={(e) =>
          setFormData({ ...formData, odometerReading: e.target.value })
        }
        required
      />

      <Input
        label="Notes (Optional)"
        value={formData.notes}
        onChange={(e) =>
          setFormData({ ...formData, notes: e.target.value })
        }
      />

      <Button type="submit" disabled={isLoading}>
        {isLoading ? 'Adding...' : 'Add Fuel Record'}
      </Button>
    </form>
  );
}
```

**File: `app/modules/fuelTracking/components/FuelHistory.tsx`**

```typescript
/**
 * Fuel History Component
 * Display list of fuel records
 */

import { Card, CardHeader, CardTitle, CardContent } from '@/Common/Card';
import type { FuelRecord } from '../types/fuel';

interface FuelHistoryProps {
  records: FuelRecord[];
  onDelete: (fuelId: string) => void;
}

export function FuelHistory({ records, onDelete }: FuelHistoryProps) {
  if (records.length === 0) {
    return <p className="text-gray-500">No fuel records yet</p>;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Fuel History</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left p-2">Date</th>
                <th className="text-left p-2">Liters</th>
                <th className="text-left p-2">Cost</th>
                <th className="text-left p-2">Odometer</th>
                <th className="text-left p-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {records.map((record) => (
                <tr key={record.id} className="border-b">
                  <td className="p-2">{record.date}</td>
                  <td className="p-2">{record.litersFilled}L</td>
                  <td className="p-2">${record.totalCost.toFixed(2)}</td>
                  <td className="p-2">{record.odometerReading}km</td>
                  <td className="p-2">
                    <button
                      onClick={() => onDelete(record.id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}
```

### Step 7: Create Page Component

**File: `app/modules/fuelTracking/pages/FuelPage.tsx`**

```typescript
/**
 * Fuel Tracking Page
 * Main page for fuel tracking feature
 */

import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '~/stores';
import { FuelForm } from '../components/FuelForm';
import { FuelHistory } from '../components/FuelHistory';
import { fuelAPI } from '../services/fuelAPI';
import { addFuelRecord, deleteFuelRecord } from '../stores/fuelSlice';

export function FuelPage() {
  const dispatch = useAppDispatch();
  const fuelRecords = useAppSelector((state) => state.fuel.records);
  const [isLoading, setIsLoading] = useState(false);

  const handleAddFuel = async (data: any) => {
    setIsLoading(true);
    try {
      // Example: Add to API and state
      const newFuel = { id: Date.now().toString(), ...data };
      dispatch(addFuelRecord(newFuel));
    } catch (error) {
      console.error('Error adding fuel:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteFuel = async (fuelId: string) => {
    try {
      dispatch(deleteFuelRecord(fuelId));
    } catch (error) {
      console.error('Error deleting fuel:', error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6">
      <h1 className="text-3xl font-bold">⛽ Fuel Tracking</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FuelForm onSubmit={handleAddFuel} isLoading={isLoading} />
        <FuelHistory records={fuelRecords} onDelete={handleDeleteFuel} />
      </div>
    </div>
  );
}
```

### Step 8: Create Module Configuration

**File: `app/modules/fuelTracking/module.config.ts`**

```typescript
/**
 * Fuel Tracking Module Configuration
 * Defines how the module is loaded and integrated
 */

import { lazy } from 'react';
import fuelReducer from './stores/fuelSlice';
import type { ModuleConfig } from '~/utils/moduleRegistry';

export const fuelTrackingConfig: ModuleConfig = {
  // Module name
  name: 'fuelTracking',

  // Version
  version: '1.0.0',

  // Feature flag that controls this module
  featureFlag: 'fuelTracking',

  // Description
  description: 'Track vehicle fuel consumption and costs',

  // Dependencies - what other modules must be enabled first
  dependencies: ['vehicleManagement'],

  // Routes to add when module loads
  routes: [
    {
      path: '/fuel',
      component: lazy(() => import('./pages/FuelPage').then((m) => ({ default: m.FuelPage }))),
      name: 'Fuel Tracking',
      icon: '⛽',
      order: 4,
    },
  ],

  // Redux stores to register
  stores: [
    {
      name: 'fuel',
      reducer: fuelReducer,
    },
  ],
};
```

### Step 9: Register Module in Main App

**File: `app/main.tsx`** (if not already done)

```typescript
import { moduleRegistry } from '~/utils/moduleRegistry';
import { fuelTrackingConfig } from './modules/fuelTracking/module.config';

// Register the module
moduleRegistry.registerModule(fuelTrackingConfig);
```

### Step 10: Enable the Feature

**File: `.env.local`**

```env
VITE_FF_FUEL_TRACKING=true
```

### Step 11: Test It

```bash
npm run dev
```

Visit: `http://localhost:5173/fuel`

Your new Fuel Tracking module should appear!

---

# 💡 Common Patterns

## Pattern 1: Simple Feature Check

**When to use:** Toggle a single UI element on/off

```typescript
import { useFeature } from '~/hooks/useFeature';

export function MyComponent() {
  const isEnabled = useFeature('featureName');

  return isEnabled ? <FeatureUI /> : null;
}
```

## Pattern 2: Feature Gate Component

**When to use:** Show different UI based on feature

```typescript
import { FeatureGate } from '@/FeatureFlags/FeatureGate';

export function MyComponent() {
  return (
    <FeatureGate
      feature="featureName"
      fallback={<p>Coming soon</p>}
    >
      <FeatureUI />
    </FeatureGate>
  );
}
```

## Pattern 3: Multiple Features

**When to use:** Multiple related features

```typescript
import { MultiFeatureGate } from '@/FeatureFlags/FeatureGate';

export function MyComponent() {
  return (
    <MultiFeatureGate
      features={['feature1', 'feature2']}
      logic="AND"  // Both required
    >
      <FeatureUI />
    </MultiFeatureGate>
  );
}
```

## Pattern 4: Feature Configuration

**When to use:** Feature has settings

```typescript
import { useFeatureConfig } from '~/hooks/useFeature';

export function MyComponent() {
  const config = useFeatureConfig('vehicleManagement');

  return (
    <div>
      Max items: {config?.maxVehiclesPerPage || 50}
    </div>
  );
}
```

## Pattern 5: Conditional Routes

**When to use:** Feature has its own routes

```typescript
// In module.config.ts
routes: [
  {
    path: '/reporting',
    component: lazy(() => import('./pages/ReportingPage')),
    name: 'Reports',
  },
];

// Only loads if module is enabled!
```

---

# ✅ Best Practices

## 🎯 Do's

### ✅ DO: Use Feature Flags for New Features

```typescript
// GOOD: Feature flag for new feature
<FeatureGate feature="newDashboard">
  <NewDashboard />
</FeatureGate>

// Allows safe rollout
// Can disable if bugs
```

### ✅ DO: Keep Features Independent

```typescript
// GOOD: Module doesn't depend on reporting
fuelTracking: {
  dependencies: ['vehicleManagement']; // Only core dependency
}

// BAD: Too many dependencies
fuelTracking: {
  dependencies: ['vehicleManagement', 'reporting', 'notifications', 'maintenance'];
}
```

### ✅ DO: Gradual Rollout

```env
# Week 1: Test with 5%
VITE_FF_NEW_FEATURE_ROLLOUT=5

# Week 2: 25%
VITE_FF_NEW_FEATURE_ROLLOUT=25

# Week 3: 100%
VITE_FF_NEW_FEATURE_ROLLOUT=100
```

### ✅ DO: Test with Feature Disabled

```typescript
// GOOD: Test both enabled and disabled
<FeatureGate feature="newUI" fallback={<OldUI />}>
  <NewUI />
</FeatureGate>

// Make sure both versions work!
```

### ✅ DO: Clean Up Old Flags

```typescript
// After 100% rollout and stable:
// Remove the feature flag
// Remove the feature branch
// Remove the old code
```

---

## ❌ Don'ts

### ❌ DON'T: Hardcode Feature Availability

```typescript
// BAD: Hardcoded
const isReportingAvailable = true;

// GOOD: Use feature flag
const isReportingAvailable = featureFlagManager.isEnabled('advancedReporting');
```

### ❌ DON'T: Mix Features and Permissions

```typescript
// BAD: Mixing concerns
if (userRole === 'admin' && featureFlagManager.isEnabled('reporting')) {
  showReporting();
}

// GOOD: Separate concerns
// Feature flag = is feature ready?
// Permissions = can user access it?
if (canUserAccess('reporting') && featureFlagManager.isEnabled('reporting')) {
  showReporting();
}
```

### ❌ DON'T: Make Features Too Complex

```typescript
// BAD: Too many dependencies
newAnalytics: {
  dependencies: ['reporting', 'export', 'realtime', 'notifications'];
}

// GOOD: Minimal dependencies
newAnalytics: {
  dependencies: ['vehicleManagement'];
}
```

### ❌ DON'T: Skip Testing Disabled Features

```typescript
// BAD: Only test when enabled
// Assume it works when disabled

// GOOD: Test both
// 1. Enable feature, test it works
// 2. Disable feature, test fallback works
// 3. Test both user flows
```

### ❌ DON'T: Deploy Without Rollout Plan

```
// BAD: Enable for 100% immediately
VITE_FF_NEW_FEATURE_ROLLOUT=100

// GOOD: Plan rollout
Week 1: 5%
Week 2: 25%
Week 3: 75%
Week 4: 100%
```

---

# 🐛 Troubleshooting

## Problem: Feature Not Showing

**Check List:**

```
1. Is the feature ENABLED in FEATURE_FLAGS?
   ✓ enabled: true

2. Is .env.local correct?
   ✓ VITE_FF_FEATURE_NAME=true

3. Did you restart dev server?
   ✓ npm run dev

4. Is it inside the right environment?
   ✓ targetEnvironments includes current env

5. Are dependencies met?
   ✓ All dependent features are enabled
```

**Debug:**

```javascript
// In browser console:
// Check if feature is enabled
window.__featureFlags?.isEnabled('featureName'); // true or false
```

## Problem: Feature Always Disabled

**Check List:**

```
1. Is enabled: true in FEATURE_FLAGS?
   ✓ Check app/utils/featureFlags.ts

2. Is rolloutPercentage set to 0?
   ✓ Change to >= 1

3. Is targetEnvironments correct?
   ✓ Check VITE_APP_ENV matches

4. Is dependency disabled?
   ✓ Enable all dependencies first
```

**Debug:**

```javascript
// In browser console:
// Get feature configuration
window.__featureFlags?.getConfig('featureName');
// Shows all settings
```

## Problem: Build Fails

**Common Causes:**

```
1. TypeScript errors
   npm run type-check

2. Import errors
   Check paths: ~/utils/ or @/components/

3. Missing dependencies
   npm install

4. Stale cache
   Delete node_modules and reinstall
   npm install
```

## Problem: Module Not Loading

**Check List:**

```
1. Is module.config.ts correct?
   ✓ featureFlag property set
   ✓ routes defined
   ✓ stores defined

2. Is feature enabled?
   ✓ VITE_FF_MODULE_NAME=true

3. Are dependencies met?
   ✓ All dependencies enabled

4. Is module registered?
   ✓ moduleRegistry.registerModule(config)
```

**Debug:**

```javascript
// In browser console:
// Get active modules
window.__moduleRegistry?.getActiveRoutes();
// Should include your module routes
```

---

# 📈 Scaling Guide

## Scaling for 10+ Modules

### Organization Strategy

```
app/modules/
├── core/                    # Essential (always on)
├── vehicles/                # Vehicle management
├── maintenance/             # Maintenance tracking
├── fuel/                    # Fuel tracking
├── drivers/                 # Driver management
├── routes/                  # Route management
├── analytics/               # Analytics (beta)
├── billing/                 # Billing (enterprise)
├── notifications/           # Notifications
├── audit/                   # Audit logging
└── admin/                   # Admin panel
```

### Naming Conventions

**Keep consistent naming:**

```typescript
// Feature flag name
fuelTracking;

// Module name
fuelTracking;

// Redux slice name
fuelSlice;

// Component folder
fuelTracking /
  components /
  // Service file
  fuelAPI.ts;

// Type file
fuel.ts;

// Page component
FuelPage.tsx;
```

**Why consistent?**

- Easy to find code
- Easy to onboard juniors
- Easy to remember
- Easy to maintain

### Module Dependencies

**Keep it simple:**

```
core (no dependencies)
  ↓
vehicles (depends on: core)
  ↓
maintenance (depends on: core, vehicles)
fuel (depends on: core, vehicles)
drivers (depends on: core)
  ↓
billing (depends on: core, vehicles, drivers)
  ↓
analytics (depends on: core, vehicles, fuel, maintenance)
```

**Rules:**

- Never create circular dependencies
- Keep max 2-3 levels deep
- Core module never depends on anything

### Team Collaboration

**Assign by Module:**

```
Team Member | Modules
------------|----------
Alice       | vehicles, maintenance
Bob         | fuel, drivers
Carol       | billing, analytics
Dave        | admin, audit
```

**Advantages:**

- One person owns each module
- Easy to assign tasks
- Easy to review code
- Easy to test

### Feature Flag Strategy for Large Apps

```
Phase 1: Development (100% enabled)
  └─ Developers test locally

Phase 2: Staging (Beta rollout)
  └─ 50% of staging users see feature

Phase 3: Production Canary (5% users)
  └─ Real user test with small group

Phase 4: Production Early Access (25% users)
  └─ Widen test group

Phase 5: Production General Availability (100% users)
  └─ Full release
```

---

# ❓ FAQs

## Q1: What's the Difference Between Feature Flags and Permissions?

**Feature Flags:**

- Controls if feature EXISTS
- "Is this feature ready?"
- Same for all users

```
Feature Disabled = Nobody can see it
Feature Enabled = Everyone with permission can see it
```

**Permissions:**

- Controls if USER can ACCESS
- "Can this user see this feature?"
- Different per user

```
User: Admin = Can access "Settings"
User: Viewer = Cannot access "Settings"
```

**Real Example:**

```typescript
// Feature flag: Is reporting ready?
const isReportingReady = featureFlagManager.isEnabled('reporting');

// Permission: Can user see reporting?
const canUserSeeReporting = user.permissions.includes('reports');

// Show only if BOTH are true
if (isReportingReady && canUserSeeReporting) {
  showReporting();
}
```

---

## Q2: When Should I Create a Module vs. a Component?

**Create a COMPONENT when:**

```
✓ Small reusable piece (Button, Card, etc.)
✓ No own routes
✓ No own Redux state
✓ Single responsibility
```

**Create a MODULE when:**

```
✓ Multiple pages
✓ Has own routes
✓ Needs own Redux state
✓ Has multiple components
✓ Can be toggled on/off independently
```

**Example:**

```
Component: Button, Card, Input (small parts)
Module: Vehicles, Maintenance, Reporting (big features)
```

---

## Q3: How Do I Delete a Feature When Done?

**Steps to remove a feature:**

1. **Remove from UI** - Delete FeatureGate components
2. **Remove from flag config** - Delete from FEATURE_FLAGS
3. **Clean up env variables** - Remove from .env example
4. **Run tests** - Ensure nothing broke
5. **Deploy** - Push to production
6. **Wait** - Make sure no issues
7. **Delete code** - Remove module/components

```typescript
// Step 1: Delete from FEATURE_FLAGS
export const FEATURE_FLAGS = {
  // Remove this:
  // advancedReporting: { ... }
};

// Step 2: Delete from code
// Delete app/modules/reporting/
// Delete all imports to reporting

// Step 3: Test
npm run type-check
npm run build

// Step 4: Deploy
```

---

## Q4: Can Two Modules Depend on Each Other?

**Answer: NO!** 🚫

Circular dependencies cause problems:

```
BAD:
reporting → depends on → analytics
analytics → depends on → reporting
          ↓
        INFINITE LOOP ❌
```

**Good design:**

```
analytics (no dependencies)
  ↓
reporting (depends on: analytics)
  ↓
dashboard (depends on: reporting)
```

---

## Q5: How Do I Test a Feature Locally?

**Method 1: Environment Variables**

```env
VITE_FF_FEATURE_NAME=true
VITE_FF_FEATURE_ROLLOUT=100
```

**Method 2: Browser Console**

```javascript
// Override for testing (dev only)
window.__featureFlags?.override('featureName', true);
```

**Method 3: Code Temporarily**

```typescript
// Change in featureFlags.ts for testing
enabled: true; // ← Change to true to test
```

**Best Practice:**

```
Use Method 1 (Environment) for normal testing
Use Method 2 (Browser) for quick debugging
Use Method 3 (Code) ONLY during development
```

---

## Q6: What If Backend Doesn't Support My Feature?

**Solution: Backend Feature Flag**

```
Frontend says: Feature is enabled ✓
Backend says: Feature not supported ✗
Result: Show error/fallback ✓
```

**Code:**

```typescript
<FeatureGate feature="newReporting">
  {/* Frontend says it's ready */}
  <ReportingUI
    fallback={<p>Backend not ready yet</p>}
  />
  {/* Backend will return 404 or error */}
  {/* Show fallback */}
</FeatureGate>
```

---

## Q7: How Do I Track Analytics for Features?

**Good Practice:**

```typescript
import { featureFlagManager } from '~/utils/featureFlags';

export function ReportingDashboard() {
  // Log when user sees feature
  useEffect(() => {
    const isEnabled = featureFlagManager.isEnabled('reporting');
    if (isEnabled) {
      analytics.track('reporting_viewed', {
        timestamp: new Date(),
        userId: currentUser.id
      });
    }
  }, []);

  return <div>Reporting Dashboard</div>;
}
```

---

## Q8: Can I Have A/B Testing?

**YES!** With rollout percentage:

```
50% rollout =
  Group A (50%): Sees new UI
  Group B (50%): Sees old UI
  Compare metrics!
```

**Code:**

```typescript
<FeatureGate
  feature="newUI"
  fallback={<OldUI />}  {/* 50% users see this */}
>
  <NewUI />  {/* 50% users see this */}
</FeatureGate>

// Track both groups in analytics
// Compare: conversion rate, speed, errors, etc.
```

---

## Q9: What's the Maximum Number of Modules?

**No hard limit!**

But practical guidelines:

```
< 10 modules:    Easy to manage, one person can handle all
10-20 modules:   Need organization, should assign by domain
20+ modules:     Need clear structure, need good documentation
50+ modules:     Same team structure as 20 modules, just bigger
```

**Key: Good organization matters more than quantity**

---

## Q10: How Do I Handle Module Errors?

**Good Practice:**

```typescript
export function FuelPage() {
  try {
    return <FuelPageContent />;
  } catch (error) {
    return (
      <div className="p-4 bg-red-50 border border-red-300 rounded">
        <h3 className="font-semibold text-red-800">
          Error in Fuel Module
        </h3>
        <p className="text-red-600">
          {error instanceof Error ? error.message : 'Unknown error'}
        </p>
      </div>
    );
  }
}
```

**Better Practice: Use Error Boundary**

```typescript
import { ErrorBoundary } from '~/components/Layout/Utility/ErrorBoundary';

export function FuelPage() {
  return (
    <ErrorBoundary>
      <FuelPageContent />
    </ErrorBoundary>
  );
}
```

---

# 🎓 Learning Path for Juniors

## Week 1: Understanding Basics

- Read this entire guide
- Run example features in browser
- Use debug panel to inspect flags

## Week 2: Using Features

- Add feature gates to existing components
- Practice using useFeature hook
- Practice using FeatureGate component

## Week 3: Creating Modules

- Create simple module (following our fuel tracking example)
- Test it locally
- Deploy it

## Week 4: Advanced

- Create dependent modules
- Implement feature rollout
- Learn analytics integration

---

# ✅ Final Checklist: Production Ready!

**Your app is ready for production because:**

✅ Feature flags prevent risky deployments
✅ Modules enable team collaboration
✅ Gradual rollout catches bugs early
✅ Easy to disable problematic features
✅ Easy to scale to 100+ modules
✅ Clear structure for juniors to learn
✅ Type-safe with TypeScript
✅ Tested bundle size (73KB gzipped)

---

## 🎉 You're Ready to Build!

**Remember:**

1. Start small
2. Keep it simple
3. Document well
4. Test thoroughly
5. Rollout gradually

**Questions?**

- Check troubleshooting section
- Review examples in `app/examples/`
- Ask seniors or in team chat

**Happy Coding! 🚀**

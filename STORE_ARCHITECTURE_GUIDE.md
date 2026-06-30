# 📚 Store Architecture Guide - Main Store vs Module Stores

A comprehensive guide to understanding Redux state management in BS-VMS: the difference between **Global Store** and **Module-Specific Stores**.

---

## 🎯 Quick Overview

| Aspect          | **Main Store**             | **Module Store**                       |
| --------------- | -------------------------- | -------------------------------------- |
| **Location**    | `app/stores/index.ts`      | `app/modules/{module}/stores/`         |
| **Scope**       | App-wide (every component) | Feature-specific (module only)         |
| **Lifecycle**   | Always loaded              | Loads with module (feature flag)       |
| **Access**      | Anywhere via hooks         | Within module via hooks                |
| **Data**        | Auth, user, app config     | Feature data (jobs, vendors, etc)      |
| **When to Use** | Global state               | Feature-specific state                 |
| **Example**     | `{ auth, user, theme }`    | `{ opportunities: { jobs, filters } }` |

---

## 🏗️ Architecture Diagram

```
┌─────────────────────────────────────────┐
│         REDUX STORE (app/stores)        │
├─────────────────────────────────────────┤
│                                         │
│  Global State (Always Loaded):          │
│  ├── auth: { user, token, role }       │
│  ├── appSettings: { theme, lang }      │
│  └── ui: { loading, modal }            │
│                                         │
│  + Module Stores (Dynamic):             │
│  ├── opportunities: {jobs, apps}  ↙─┐   │
│  ├── vendors: {vendors, metrics}  ←─┼─┐ │
│  └── notifications: {queue}       ←─┼─┼─┤
│                                   │ │ │ │
└─────────────────────────────────────────┘
        │         │          │
        │         │          │
   Module A   Module B    Module C
```

---

## 📍 Main Store (`app/stores/index.ts`)

### Purpose

Store **global application state** that multiple modules or components need to access.

### When to Use

✅ User authentication  
✅ Current user information  
✅ App-wide settings (theme, language)  
✅ Global UI state (modal open, notification)  
✅ User permissions/role  
✅ Session data

### Example Structure

```typescript
// app/stores/index.ts

import { configureStore } from '@reduxjs/toolkit';
import { authReducer } from './slices/authSlice';
import { appSettingsReducer } from './slices/appSettingsSlice';
import { uiReducer } from './slices/uiSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer, // Global auth state
    appSettings: appSettingsReducer, // Global app config
    ui: uiReducer, // Global UI state
    // Module stores injected here dynamically
  },
});
```

### What Goes in Main Store

```typescript
// ✅ CORRECT - Global state
{
  auth: {
    isAuthenticated: boolean,
    user: User | null,
    token: string | null,
    role: 'admin' | 'user' | 'recruiter'
  },

  appSettings: {
    theme: 'light' | 'dark',
    language: 'en' | 'es' | 'fr',
    timeZone: string,
    notifications: boolean
  },

  ui: {
    loadingGlobal: boolean,
    modalOpen: boolean,
    sidebarCollapsed: boolean,
    notification: { message: string, type: 'success' | 'error' } | null
  }
}

// ❌ WRONG - Feature-specific data (belongs in module store)
{
  jobs: [...],              // Should be in opportunities module
  vendors: [...],           // Should be in vendors module
  maintenanceRecords: [...] // Should be in maintenance module
}
```

---

## 🧩 Module Stores (`app/modules/{module}/stores/`)

### Purpose

Store **feature-specific state** that only that module needs.

### When to Use

✅ Feature data (jobs, vendors, records)  
✅ Feature filters and search  
✅ Feature pagination  
✅ Feature loading/error states  
✅ Feature-specific settings

### Example: Opportunities Module

```
app/modules/opportunities/stores/
└── opportunitiesSlice.ts
```

```typescript
// app/modules/opportunities/stores/opportunitiesSlice.ts

import { createSlice } from '@reduxjs/toolkit';

interface OpportunitiesState {
  jobs: JobPosting[];
  filteredJobs: JobPosting[];
  applications: JobApplication[];
  selectedJob: JobPosting | null;
  filters: JobFilter;
  isLoading: boolean;
  error: string | null;
  totalCount: number;
  currentPage: number;
  itemsPerPage: number;
}

export const opportunitiesSlice = createSlice({
  name: 'opportunities',
  initialState: {
    jobs: [],
    filteredJobs: [],
    applications: [],
    selectedJob: null,
    filters: {},
    isLoading: false,
    error: null,
    totalCount: 0,
    currentPage: 1,
    itemsPerPage: 10,
  },
  reducers: {
    // Feature-specific actions
    fetchJobsStart: (state) => {
      state.isLoading = true;
    },
    fetchJobsSuccess: (state, action) => {
      state.jobs = action.payload;
      state.isLoading = false;
    },
    setFilters: (state, action) => {
      state.filters = action.payload;
      // Apply filters logic
    },
    // ... more actions
  },
});
```

### Redux State with Module Store

```typescript
{
  // Global State (Main Store)
  auth: {
    user: { id: '123', name: 'John', role: 'recruiter' },
    isAuthenticated: true
  },

  // Module-Specific State
  opportunities: {      // Injected from module
    jobs: [
      { id: '1', title: 'Senior Engineer', department: 'Engineering', ... },
      { id: '2', title: 'Product Manager', department: 'Product', ... }
    ],
    filteredJobs: [...],
    selectedJob: { id: '1', title: 'Senior Engineer', ... },
    filters: { department: 'Engineering', searchText: 'Engineer' },
    isLoading: false,
    error: null,
    currentPage: 1,
    totalCount: 25
  }
}
```

---

## 🔗 How They Work Together

### Example: Job Postings Module

**Scenario**: A recruiter browsing job postings and filtering by department

```
Component: OpportunitiesPage
    ↓
Action 1: Get Global Auth (from main store)
    → auth.user.name → "John"
    → auth.user.role → "recruiter"

Action 2: Get Feature Data (from module store)
    → opportunities.jobs → [list of 25 jobs]
    → opportunities.selectedJob → job details
    → opportunities.filters → { department: 'Engineering' }
    → opportunities.filteredJobs → [3 engineering jobs]
```

### Code Example

```typescript
// app/modules/opportunities/pages/OpportunitiesPage.tsx

import { useAppSelector } from '~/stores';
import { useJobs, useJobFilters } from '../hooks/useOpportunities';

export function OpportunitiesPage() {
  // ✅ Access Global Store
  const currentUser = useAppSelector(state => state.auth.user);
  const userRole = useAppSelector(state => state.auth.role);

  // ✅ Access Module Store
  const { jobs, filteredJobs, isLoading } = useJobs();
  const { filters, applyFilters } = useJobFilters();

  return (
    <div>
      <h1>Welcome, {currentUser.name}</h1>
      {userRole === 'recruiter' && <button>Post Job</button>}

      <JobList jobs={filteredJobs} />
      <JobFilters
        filters={filters}
        onFilterChange={applyFilters}
      />
    </div>
  );
}
```

---

## 🎯 Real-World Examples

### Example 1: Vendors Module (Similar to Opportunities)

**Main Store** (Global):

```typescript
{
  auth: {
    user: { id: '1', name: 'Alice', role: 'admin' },
    isAuthenticated: true
  }
}
```

**Module Store** (Vendors):

```typescript
{
  vendors: {
    vendors: [
      { id: 'V1', name: 'Acme Corp', paymentTerms: '30 days', rating: 4.5 },
      { id: 'V2', name: 'Tech Supplies Inc', paymentTerms: '45 days', rating: 4.2 }
    ],
    filteredVendors: [...],
    selectedVendor: null,
    filters: { minRating: 4 },
    isLoading: false,
    totalCount: 150,
    currentPage: 1
  }
}
```

**When to Use Each**:

- Global: Check if current user is admin → decide if show "Add Vendor" button
- Module: Filter vendors by rating → show only top-rated vendors

---

### Example 2: Notification System

**Main Store** (Single Active Notification):

```typescript
{
  ui: {
    notification: {
      message: 'Job posted successfully!',
      type: 'success',
      duration: 3000
    }
  }
}
```

**Module Store** (All Notifications in Queue):

```typescript
{
  notifications: {
    queue: [
      { id: '1', message: 'New application', type: 'info', ... },
      { id: '2', message: 'Job closed', type: 'warning', ... },
      { id: '3', message: 'Application rejected', type: 'error', ... }
    ],
    activeNotification: '1',
    unreadCount: 3
  }
}
```

---

## 🔌 How Modules Register Stores

### Step 1: Create Module Config

```typescript
// app/modules/opportunities/module.config.ts

export const opportunitiesModuleConfig: ModuleConfig = {
  name: 'opportunities',
  featureFlag: 'jobPostings',
  stores: [
    {
      name: 'opportunities',
      // reducer will be injected
    },
  ],
};
```

### Step 2: Register Module

```typescript
// app/main.tsx

import { opportunitiesModuleConfig } from './modules/opportunities/module.config';

moduleRegistry.registerModule(opportunitiesModuleConfig);
// This automatically injects the opportunities reducer into Redux store
```

### Step 3: Module Store Only Loads If Feature Flag Enabled

```typescript
// app/utils/featureFlags.ts

jobPostings: {
  name: 'jobPostings',
  enabled: true,  // ← Module only loads if true
  description: 'Job postings and career opportunities',
  rolloutPercentage: 100
}
```

**Result**:

```
If enabled: Redux store includes opportunities reducer
If disabled: opportunities reducer never loaded
```

---

## 📊 Comparison Table

### When Each Store Is Populated

| Store Type | Loaded When                    | Cleared When     | Accessible From        |
| ---------- | ------------------------------ | ---------------- | ---------------------- |
| **Main**   | App starts                     | User logs out    | Anywhere in app        |
| **Module** | Feature enabled + module loads | Feature disabled | Module components only |

### State Persistence

| Store Type | Persist?                 | Why                      |
| ---------- | ------------------------ | ------------------------ |
| **Main**   | Often (auth token, user) | Need to maintain session |
| **Module** | Optional                 | Fresh on module reload   |

---

## 🛠️ Practical Guide: Creating Both

### Creating Main Store State (Global)

```typescript
// app/stores/slices/appSettingsSlice.ts

import { createSlice } from '@reduxjs/toolkit';

export const appSettingsSlice = createSlice({
  name: 'appSettings',
  initialState: {
    theme: 'light',
    language: 'en',
    notificationsEnabled: true,
  },
  reducers: {
    setTheme: (state, action) => {
      state.theme = action.payload;
    },
    setLanguage: (state, action) => {
      state.language = action.payload;
    },
  },
});

export const { setTheme, setLanguage } = appSettingsSlice.actions;
export default appSettingsSlice.reducer;
```

### Creating Module Store State (Features)

```typescript
// app/modules/opportunities/stores/opportunitiesSlice.ts

import { createSlice } from '@reduxjs/toolkit';

export const opportunitiesSlice = createSlice({
  name: 'opportunities',
  initialState: {
    jobs: [],
    selectedJob: null,
    isLoading: false,
  },
  reducers: {
    selectJob: (state, action) => {
      state.selectedJob = action.payload;
    },
    fetchJobsStart: (state) => {
      state.isLoading = true;
    },
    fetchJobsSuccess: (state, action) => {
      state.jobs = action.payload;
      state.isLoading = false;
    },
  },
});
```

### Access in Component

```typescript
import { useAppSelector } from '~/stores';
import { useJobs } from '~/modules/opportunities/hooks';

export function Dashboard() {
  // Global state
  const theme = useAppSelector(state => state.appSettings.theme);
  const user = useAppSelector(state => state.auth.user);

  // Module state
  const { jobs, isLoading } = useJobs();

  return (
    <div style={{ theme }}>
      <h1>Welcome, {user.name}</h1>
      <JobsList jobs={jobs} loading={isLoading} />
    </div>
  );
}
```

---

## 🎓 Decision Tree: Where to Store State?

```
┌─ Is this data used by MULTIPLE modules?
│
├─ YES → Main Store
│   ├─ User authentication
│   ├─ App settings
│   └─ Global UI state
│
└─ NO → Check if used in multiple components
    │
    ├─ YES → Module Store
    │   ├─ Feature list (jobs, vendors, etc)
    │   ├─ Feature filters
    │   └─ Feature pagination
    │
    └─ NO → Local Component State (useState)
        ├─ Form input
        ├─ Modal open/close
        └─ Local UI state
```

---

## ✅ Best Practices

### ✅ DO:

- ✅ Keep global state minimal (auth, user, settings)
- ✅ Use module stores for feature-specific data
- ✅ Create custom hooks for accessing store data
- ✅ Use TypeScript interfaces for state shape
- ✅ Load/unload module stores with feature flags

### ❌ DON'T:

- ❌ Put feature data in main store
- ❌ Create stores for every component
- ❌ Mix multiple features in one store
- ❌ Directly access Redux state (use custom hooks)
- ❌ Store API responses without normalization

---

## 🧪 Testing

### Test Main Store

```typescript
it('should set theme in app settings', () => {
  const store = configureStore({ reducer: { appSettings: appSettingsReducer } });

  store.dispatch(setTheme('dark'));
  const state = store.getState();

  expect(state.appSettings.theme).toBe('dark');
});
```

### Test Module Store

```typescript
it('should fetch opportunities', async () => {
  // Create store with opportunities reducer
  const store = configureStore({
    reducer: { opportunities: opportunitiesReducer },
  });

  store.dispatch(fetchJobsStart());
  // Simulate API call
  store.dispatch(fetchJobsSuccess(mockJobs));

  expect(store.getState().opportunities.jobs).toEqual(mockJobs);
});
```

---

## 📝 Summary

| Aspect        | Main Store        | Module Store          |
| ------------- | ----------------- | --------------------- |
| **Purpose**   | Global app state  | Feature-specific data |
| **Loaded**    | App start         | Module enabled        |
| **Shared**    | Between modules   | Within module only    |
| **Example**   | auth, user, theme | jobs, filters, apps   |
| **Lifecycle** | Till logout       | Till feature disabled |
| **Access**    | Global hooks      | Feature hooks         |

---

## 🚀 Next Steps

1. **Review** the [Opportunities Module README](../../app/modules/opportunities/README.md)
2. **Explore** `app/modules/opportunities/stores/opportunitiesSlice.ts`
3. **Compare** with `app/stores/index.ts` (main store)
4. **Create** a new module following this pattern
5. **Test** accessing both global and module state

---

**Created**: 2026  
**Version**: 1.0  
**Status**: ✅ Complete

For more details, see:

- [Developers Guide](../../DEVELOPERS_COMPLETE_GUIDE.md)
- [Feature Flags Guide](../../FEATURE_FLAGS_GUIDE.md)
- [Opportunities Module](../../app/modules/opportunities/README.md)

#!/usr/bin/null

# 🎯 Quick Reference: Main Store vs Module Store (with Job Postings Example)

## Visual Comparison

```
┌──────────────────────────────────────────────────────────────┐
│                         REDUX STORE                          │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌─ MAIN STORE (app/stores/)                                │
│  │                                                           │
│  │  auth: {                                                 │
│  │    user: { id, name, email, role }        ← GLOBAL      │
│  │    isAuthenticated: boolean                ← GLOBAL      │
│  │    token: string | null                    ← GLOBAL      │
│  │  }                                                        │
│  │                                                           │
│  │  appSettings: {                                          │
│  │    theme: 'light' | 'dark'                 ← GLOBAL      │
│  │    language: 'en' | 'es'                   ← GLOBAL      │
│  │  }                                                        │
│  └──────────────────────────────────────────────────────────
│
│  ┌─ MODULE STORES (app/modules/{module}/stores/)            │
│  │                                                           │
│  │  opportunities: {       ← Only loaded if feature enabled │
│  │    jobs: []             ← Feature-specific              │
│  │    selectedJob: null    ← Feature-specific              │
│  │    filters: {}          ← Feature-specific              │
│  │    isLoading: false     ← Feature-specific              │
│  │  }                                                        │
│  │                                                           │
│  │  vendors: {             ← Only loaded if feature enabled │
│  │    vendors: []          ← Feature-specific              │
│  │    selectedVendor: null ← Feature-specific              │
│  │  }                                                        │
│  └──────────────────────────────────────────────────────────
│
└──────────────────────────────────────────────────────────────┘
```

---

## Key Differences

### 📍 Main Store (Global)

**Location**: `app/stores/index.ts`

**What Goes Here**:

- User authentication (`auth.user`, `auth.token`)
- User settings (`appSettings.theme`, `appSettings.language`)
- Global UI state (`ui.loadingGlobal`, `ui.notification`)

**When Loaded**: App startup (always)

**Accessed From**: Any component in the app

**Example**:

```typescript
const currentUser = useAppSelector((state) => state.auth.user);
// ✅ Can access from Dashboard, OpportunitiesPage, VendorsPage
```

---

### 🧩 Module Store (Feature-Specific)

**Location**: `app/modules/{module}/stores/`

**What Goes Here**:

- Feature data (`opportunities.jobs`, `vendors.vendors`)
- Feature filters (`opportunities.filters`)
- Feature pagination (`opportunities.currentPage`)
- Feature loading state (`opportunities.isLoading`)

**When Loaded**: When module initializes (depends on feature flag)

**Accessed From**: Components within that module only

**Example**:

```typescript
const { jobs } = useJobs(); // From opportunities module
// ✅ Can only use in opportunities module
// ❌ Can't use in vendors module
```

---

## Real-World Scenario: Job Postings Feature

### Scenario

A recruiter logs in and views job postings:

```
Step 1: Authentication
  └─ Main Store (auth)
    ├─ currentUser: { id: 'R1', name: 'Alice', role: 'recruiter' }
    ├─ isAuthenticated: true
    └─ token: 'jwt-token-xyz'
         ↓
    "Is this user a recruiter? Can they post jobs?"

Step 2: Feature Check
  └─ Feature Flags
    ├─ jobPostings: enabled (checks feature flag)
    ├─ opportunities module: loads
    └─ opportunities store: injected into Redux
         ↓
    "Job postings feature is available"

Step 3: Fetch Jobs
  └─ Module Store (opportunities)
    ├─ jobs: [{ id: '1', title: 'Senior Engineer' }, ...]
    ├─ filteredJobs: [{ id: '1', title: 'Senior Engineer' }]
    ├─ selectedJob: null
    ├─ filters: { department: 'Engineering' }
    ├─ isLoading: false
    └─ totalCount: 25
         ↓
    "Display list of 25 jobs, 1 matches Engineering filter"

Step 4: User Interaction
  └─ Click job → Module Store
    ├─ selectedJob: { id: '1', title: 'Senior Engineer', ... }
    └─ Applications for this job loaded
         ↓
    "Show job details and application form"
```

---

## File Structure

### Main Store (Global)

```
app/stores/
├── index.ts                          # Store configuration
├── slices/
│   ├── authSlice.ts                  # Authentication state
│   ├── appSettingsSlice.ts           # App settings state
│   └── uiSlice.ts                    # Global UI state
└── types/
    └── store.ts                      # Type definitions
```

### Module Store (Opportunities)

```
app/modules/opportunities/
├── module.config.ts                  # Module configuration (includes reducer)
├── stores/
│   └── opportunitiesSlice.ts         # Feature state (jobs, filters, etc)
├── types/
│   └── opportunities.ts              # Feature types (JobPosting, etc)
├── hooks/
│   └── useOpportunities.ts           # Custom hooks (useJobs, useFilters, etc)
├── pages/
│   ├── OpportunitiesPage.tsx         # Job listings page
│   └── JobDetailsPage.tsx            # Job details page
├── services/
│   └── opportunitiesAPI.ts           # API calls
└── README.md                         # Module documentation
```

---

## Usage Examples

### ✅ Accessing Main Store (Global)

```typescript
import { useAppSelector } from '~/stores';

export function Dashboard() {
  // ✅ Access from anywhere in app
  const currentUser = useAppSelector(state => state.auth.user);
  const theme = useAppSelector(state => state.appSettings.theme);

  return <h1>Welcome, {currentUser?.name}</h1>;
}
```

### ✅ Accessing Module Store (Opportunities)

```typescript
import { useJobs, useJobFilters } from '~/modules/opportunities/hooks/useOpportunities';

export function OpportunitiesPage() {
  // ✅ Access opportunities module data
  const { jobs, isLoading } = useJobs();
  const { filters, applyFilters } = useJobFilters();

  return (
    <div>
      <JobList jobs={jobs} loading={isLoading} />
      <JobFilters filters={filters} onChange={applyFilters} />
    </div>
  );
}
```

### ✅ Using Both Together

```typescript
import { useAppSelector } from '~/stores';
import { useJobs } from '~/modules/opportunities/hooks/useOpportunities';

export function OpportunitiesPage() {
  // Global: Check if user is recruiter
  const userRole = useAppSelector(state => state.auth.role);

  // Module: Get jobs
  const { jobs, isLoading } = useJobs();

  return (
    <div>
      {userRole === 'recruiter' && <button>Post New Job</button>}
      {isLoading ? <Spinner /> : <JobList jobs={jobs} />}
    </div>
  );
}
```

---

## Decision Guide: Where to Store Data?

```
Is this data used by multiple modules?
│
├─ YES
│  └─ Main Store ✅
│     ├─ auth.user (used by all modules)
│     ├─ appSettings (used by all pages)
│     └─ ui.notification (global alerts)
│
└─ NO
   └─ Is it used by multiple components within a module?
      │
      ├─ YES
      │  └─ Module Store ✅
      │     ├─ opportunities.jobs (used by list, details, filter)
      │     ├─ opportunities.filters (used by list, sidebar)
      │     └─ opportunities.selectedJob (used by details page)
      │
      └─ NO
         └─ Local Component State (useState) ✅
            ├─ Form input value
            ├─ Modal open/close
            └─ Hover state
```

---

## State Tree Examples

### ✅ Correct Structure

```typescript
{
  // Global (Main Store)
  auth: {
    user: { id: 'U1', name: 'Alice', role: 'recruiter' },
    isAuthenticated: true
  },

  appSettings: {
    theme: 'dark',
    language: 'en'
  },

  // Module-Specific (Opportunities Module)
  opportunities: {
    jobs: [
      { id: 'J1', title: 'Senior Engineer', department: 'Engineering' },
      { id: 'J2', title: 'Product Manager', department: 'Product' }
    ],
    selectedJob: { id: 'J1', title: 'Senior Engineer', ... },
    filters: { department: 'Engineering' },
    isLoading: false,
    currentPage: 1
  }
}
```

### ❌ Wrong Structure

```typescript
{
  // ❌ Feature data in main store (wrong!)
  jobs: [...],
  vendors: [...],
  opportunities: [...],

  // ✅ Correct (global data)
  auth: { user: {...} },
  appSettings: { theme: 'dark' }
}
```

---

## Feature Flag Integration

### How Modules Load/Unload

```
app/utils/featureFlags.ts
│
├─ jobPostings: { enabled: true }
│   │
│   └─ module loads
│       ├─ Routes registered
│       ├─ Store reducer injected
│       └─ Features available
│
└─ jobPostings: { enabled: false }
    │
    └─ module unloads
        ├─ Routes removed
        ├─ Store cleared
        └─ Features unavailable
```

### Module Configuration

```typescript
// app/modules/opportunities/module.config.ts

export const opportunitiesModuleConfig: ModuleConfig = {
  name: 'opportunities',
  featureFlag: 'jobPostings', // ← Check this feature flag
  stores: [
    {
      name: 'opportunities', // ← Store name
      reducer: opportunitiesReducer, // ← Add to Redux
    },
  ],
};
```

---

## Common Patterns

### Pattern 1: Load Data on Component Mount

```typescript
export function OpportunitiesPage() {
  const { jobs, isLoading, fetchJobs } = useJobs();

  useEffect(() => {
    fetchJobs();  // Load from API
  }, []);

  return <JobList jobs={jobs} loading={isLoading} />;
}
```

### Pattern 2: Filter Data

```typescript
export function JobSearch() {
  const { jobs, applyFilters } = useJobFilters();

  const handleDepartmentChange = (dept) => {
    applyFilters({ department: dept });  // Filter in Redux
  };

  return <select onChange={handleDepartmentChange}>...</select>;
}
```

### Pattern 3: Select Item for Details

```typescript
export function JobDetailsPage() {
  const { selectedJob, selectJobById } = useSelectedJob();

  useEffect(() => {
    selectJobById(jobId);  // Load specific job
  }, [jobId]);

  return selectedJob ? <JobDetails job={selectedJob} /> : <Loading />;
}
```

---

## Summary Table

| Aspect           | Main Store            | Module Store                 |
| ---------------- | --------------------- | ---------------------------- |
| **Location**     | `app/stores/index.ts` | `app/modules/{name}/stores/` |
| **Scope**        | App-wide              | Feature-specific             |
| **Access**       | Global hooks          | Feature hooks                |
| **Lifecycle**    | Always loaded         | Loaded with feature flag     |
| **Example Data** | User, theme, settings | Jobs, filters, selections    |
| **When to Use**  | Cross-module data     | Single feature data          |
| **Sharing**      | Between modules       | Within module only           |

---

## Next Steps

1. **Review** [STORE_ARCHITECTURE_GUIDE.md](./STORE_ARCHITECTURE_GUIDE.md)
2. **Explore** `app/modules/opportunities/` structure
3. **Study** `app/modules/opportunities/stores/opportunitiesSlice.ts`
4. **Compare** with `app/stores/index.ts`
5. **Create** your own module following this pattern

---

**Module Status**: ✅ Complete  
**Build Status**: ✅ Success (0 TypeScript errors)  
**Documentation**: ✅ Complete

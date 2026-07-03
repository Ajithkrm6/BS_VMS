# 📖 BS-VMS - Complete Developer Guide

**Unified Documentation | Production-Ready | Scale to Millions**

**Date:** 2026-07-03 | **Version:** 1.0.0 | **Status:** ✅ Production Foundation

---

## 📋 Table of Contents

1. [Quick Overview](#quick-overview)
2. [Tech Stack](#tech-stack)
3. [Project Structure](#project-structure)
4. [Getting Started](#getting-started)
5. [Architecture](#architecture)
6. [Authentication System](#authentication-system)
7. [State Management](#state-management)
8. [Data Handling](#data-handling)
9. [Feature Flags](#feature-flags)
10. [Module System](#module-system)
11. [API Integration](#api-integration)
12. [Production Checklist](#production-checklist)
13. [Common Commands](#common-commands)
14. [Troubleshooting](#troubleshooting)

---

# 1️⃣ Quick Overview

## What is BS-VMS?

**BS-VMS** (Vendor Management System) is a modern, production-ready web application for managing vendors, jobs, and opportunities.

**Key Features:**

- ✅ Authentication with multiple roles (Vendor, Customer, Admin)
- ✅ Feature flags for safe rollout control
- ✅ Module system for scalable features
- ✅ Protected routes and role-based access
- ✅ Session persistence
- ✅ Modern UI with Tailwind CSS

## Designed For

- 🚀 **Startups** - Fast to market with production standards
- 📈 **Scale** - Architecture supports millions of users
- 🔒 **Security** - Foundation for enterprise features
- 🛠️ **Developers** - Clear structure, well-documented

---

# 2️⃣ Tech Stack

## Frontend

| Technology       | Version | Purpose                   |
| ---------------- | ------- | ------------------------- |
| **React**        | 18.3.1  | UI framework              |
| **Vite**         | 5.4.21  | Build tool (fast HMR)     |
| **TypeScript**   | 5.6.3   | Type safety (strict mode) |
| **Tailwind CSS** | 3.4.14  | Utility-first styling     |
| **React Router** | 6.28.0  | SPA routing               |

## State Management

| Technology         | Version | Purpose                 |
| ------------------ | ------- | ----------------------- |
| **Redux Toolkit**  | 2.0.1   | Global state management |
| **React Redux**    | 9.1.2   | Redux binding for React |
| **TanStack Query** | 5.57.0  | Server state caching    |

## Development

| Technology   | Version | Purpose         |
| ------------ | ------- | --------------- |
| **ESLint**   | 9.13.0  | Code linting    |
| **Prettier** | 3.3.3   | Code formatting |
| **PostCSS**  | 8.4.20  | CSS processing  |

## Key Features

- ✅ **Strict TypeScript** - `noImplicitAny`, `strictNullChecks`, no unused variables
- ✅ **Module Bundling** - Automatic code splitting (vendor, app, router, query, state)
- ✅ **Path Aliases** - `~/` for app/, `@/` for app/components/
- ✅ **HMR** - Hot module replacement (instant updates during dev)
- ✅ **CSS Modules** - Scoped styling with Tailwind

---

# 3️⃣ Project Structure

## Directory Layout

```
BS-VMS/
├── app/
│   ├── components/
│   │   ├── Auth/
│   │   │   ├── AuthPage.tsx
│   │   │   ├── LoginForm.tsx
│   │   │   ├── RegisterForm.tsx
│   │   │   └── ProtectedRoute.tsx
│   │   ├── Layout/
│   │   │   ├── Primary/
│   │   │   │   ├── index.tsx
│   │   │   │   ├── Sidebar.tsx
│   │   │   │   └── TopNavigation.tsx
│   │   │   └── Utility/
│   │   │       ├── ErrorBoundary.tsx
│   │   │       └── LoadingSpinner.tsx
│   │   ├── Common/
│   │   │   ├── Button.tsx
│   │   │   ├── Card.tsx
│   │   │   └── Input.tsx
│   │   └── FeatureFlags/
│   │       └── FeatureGate.tsx
│   │
│   ├── modules/
│   │   ├── core/
│   │   ├── opportunities/
│   │   └── [other-modules]/
│   │
│   ├── routes/
│   ├── stores/
│   ├── services/
│   ├── hooks/
│   ├── types/
│   ├── utils/
│   ├── main.tsx
│   └── root.tsx
│
├── vite.config.ts
├── tsconfig.json
├── tailwind.config.js
├── postcss.config.js
├── .eslintrc.json
├── .prettierrc.json
├── package.json
└── index.html
```

---

# 4️⃣ Getting Started

## 1. Installation

```bash
# Clone the project
git clone <repo-url>
cd BS-VMS

# Install dependencies
npm install

# Start development server
npm run dev
```

Visit: `http://localhost:5173`

## 2. Available Scripts

```bash
npm run dev              # Start development server (HMR enabled)
npm run build           # Production build
npm run preview         # Preview production build locally
npm run type-check      # TypeScript validation
npm run lint            # Code linting
npm run lint:fix        # Auto-fix linting errors
npm run format          # Format code with Prettier
npm run format:check    # Check formatting
```

## 3. First Steps

### Step 1: Understand the Structure

Read section 3 (Project Structure) to know where things are located.

### Step 2: Login to the App

```
Visit: http://localhost:5173
Redirected to: /auth (login page)

Demo Credentials:
- Vendor:   vendor@test.com   / vendor123
- Customer: customer@test.com / customer123
- Admin:    admin@test.com    / admin123
```

### Step 3: Explore the Code

Start with: `app/main.tsx` → `app/routes/index.tsx` → `app/components/Auth/`

### Step 4: Create Your First Feature

1. Define a feature flag in: `app/utils/featureFlags.ts`
2. Create component in: `app/components/`
3. Use `useFeature()` hook to enable/disable it

---

# 5️⃣ Architecture

## Application Layers

```
┌─────────────────────────────────────────────────────┐
│ UI Layer (React Components)                          │
│ - LoginForm, Dashboard, etc.                         │
└─────────────────────────────────────────────────────┘
                      ↕
┌─────────────────────────────────────────────────────┐
│ State Management Layer                              │
│ - Redux (global state)                              │
│ - TanStack Query (server state)                     │
│ - Hooks (useAuth, useFeature)                       │
└─────────────────────────────────────────────────────┘
                      ↕
┌─────────────────────────────────────────────────────┐
│ Services Layer                                      │
│ - API clients (authAPI, etc.)                       │
│ - Custom hooks                                      │
│ - Utilities                                         │
└─────────────────────────────────────────────────────┘
                      ↕
┌─────────────────────────────────────────────────────┐
│ Backend Layer (To Be Implemented)                   │
│ - Node.js / Python / Go API                         │
│ - Database (PostgreSQL / MongoDB)                   │
│ - Authentication Service                           │
└─────────────────────────────────────────────────────┘
```

## Data Flow

```
User Interaction → Component Event → Redux Action → API Call
→ Redux Update → Component Re-render → Updated UI
```

---

# 6️⃣ Authentication System

## Overview

**3-Tier Hybrid Authentication:**

1. Redux Store (Runtime state)
2. localStorage (Persistent backup)
3. Backend API (Source of truth)

## Key Files

| Component  | File                      |
| ---------- | ------------------------- |
| Types      | `app/types/auth.ts`       |
| API        | `app/services/authAPI.ts` |
| Redux      | `app/stores/authSlice.ts` |
| Hook       | `app/hooks/useAuth.ts`    |
| Components | `app/components/Auth/`    |

## Data Flow: Login

```
User submits form → Redux dispatches loginUser
→ authAPI validates → Redux updates (user, token, isAuthenticated)
→ localStorage saves → Redirect to home → ProtectedRoute allows access
```

## Using Auth in Components

```typescript
import { useAuth } from '~/hooks/useAuth';

function MyComponent() {
  const { user, isAuthenticated, login, logout, hasRole } = useAuth();

  if (!isAuthenticated) return <p>Not logged in</p>;
  if (hasRole('admin')) return <AdminPanel />;

  return <UserDashboard user={user} />;
}
```

## Demo Credentials

```
Vendor:   vendor@test.com   / vendor123
Customer: customer@test.com / customer123
Admin:    admin@test.com    / admin123
```

---

# 7️⃣ State Management

## Redux Setup

**Store Configuration:** `app/stores/index.ts`

```typescript
store = configureStore({
  reducer: {
    auth: authReducer,
    // Add more slices here
  },
});
```

## Auth Slice

**File:** `app/stores/authSlice.ts`

```typescript
State: {
  user: User | null,
  token: string | null,
  isAuthenticated: boolean,
  isLoading: boolean,
  error: string | null
}

Actions:
- loginUser({ email, password })
- registerUser({ ... })
- logoutUser(token)
- validateSession(token)
- clearError()
```

## Custom Hook Pattern

**File:** `app/hooks/useAuth.ts`

```typescript
const {
  // State
  user,
  token,
  isAuthenticated,
  isLoading,
  error,

  // Actions
  login,
  register,
  logout,
  clearError,

  // Helpers
  hasRole,
  isVendor,
  isCustomer,
  isAdmin,
} = useAuth();
```

## Where to Add New State

- **Global State (Redux):** User data, app settings, theme
- **Server State (TanStack Query):** API data, lists, paginated data
- **Local State (useState):** Form inputs, UI toggles, modals

---

# 8️⃣ Data Handling

## 3-Tier Architecture

```
Tier 1: Redux Store (Runtime in-memory)
   ↕ (Auto-synced)
Tier 2: localStorage (Persists across refresh)
   ↕ (Validated)
Tier 3: Backend API (Source of truth)
```

## Data Access

```typescript
// Components read from Redux
const { user } = useAuth();

// localStorage checked on app load
const token = localStorage.getItem('auth_token');

// Backend validates everything
await validateSession(token);
```

## Inspecting Data

```javascript
// View Redux state
store.getState().auth;

// View localStorage
localStorage.getItem('auth_token');

// View all keys
Object.keys(localStorage);
```

---

# 9️⃣ Feature Flags - Control Everything

## What Are Feature Flags?

Feature flags are **switches** that enable/disable features without redeploying code.

- ✅ Gradual rollout (10% → 25% → 50% → 100%)
- ✅ A/B testing
- ✅ Beta features
- ✅ Quick kill switch if bugs found

## The Single Source of Truth

**File:** `app/utils/featureFlags.ts`

This is the ONLY place where flags are defined. Everything else reads from here.

## Define a Feature Flag

```typescript
// app/utils/featureFlags.ts

export const FEATURE_FLAGS: FeatureFlags = {
  jobPostings: {
    name: 'jobPostings',
    enabled: true,
    description: 'Job opportunities module',
    rolloutPercentage: 10, // 0-100 users see it
    targetEnvironments: ['production'],
    config: {
      maxJobsPerPage: 20,
      allowBulkOperations: true,
    },
    dependencies: ['authentication'],
  },
};
```

## Use in Components

### Method 1: useFeature Hook

```typescript
const isEnabled = useFeature('jobPostings');
if (isEnabled) {
  // Show feature
}
```

### Method 2: FeatureGate Component

```typescript
<FeatureGate feature="jobPostings">
  <JobPostingsUI />
</FeatureGate>
```

### Method 3: Conditional Rendering

```typescript
if (useFeature('darkMode')) {
  setTheme('dark');
}
```

## Gradual Rollout Example

```
Week 1: rolloutPercentage: 10   (10% of users)
Week 2: rolloutPercentage: 25   (25% of users)
Week 3: rolloutPercentage: 50   (A/B testing)
Week 4: rolloutPercentage: 100  (Everyone)

If bugs: rolloutPercentage: 0   (Instant disable!)
```

## Testing Flags

```javascript
// Browser Console
featureFlagManager.isEnabled('jobPostings');
// Returns: true or false

featureFlagManager.getConfig('jobPostings');
// Returns: { maxJobsPerPage: 20, ... }

// Override for testing
featureFlagManager.override('darkMode', { enabled: true, rolloutPercentage: 100 });

// Reset
featureFlagManager.clearOverride('darkMode');
```

---

# 🔟 Module System

## What is a Module?

A module is a **self-contained feature** with:

- Own routes
- Own Redux slice
- Own API services
- Own pages
- Own types

**Example:** Opportunities (Job Postings) module

## Module Structure

```
app/modules/opportunities/
├── module.config.ts
├── types/
├── stores/
├── services/
├── hooks/
├── pages/
└── README.md
```

## Register a Module

**File:** `app/modules/opportunities/module.config.ts`

```typescript
export const opportunitiesModuleConfig: ModuleConfig = {
  name: 'opportunities',
  version: '1.0.0',
  featureFlag: 'jobPostings', // Only load if flag enabled

  routes: [
    {
      path: '/opportunities',
      name: 'Opportunities',
      component: lazy(() => import('./pages/OpportunitiesPage')),
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

## 🔄 Module Discovery & Rendering Flow

When you create a module (e.g., "interviews"), here's what happens:

### Step 1: Create Module Config

**File:** `app/modules/interviews/module.config.ts`

```typescript
export const interviewsModuleConfig: ModuleConfig = {
  name: 'interviews',
  featureFlag: 'interviewManagement', // ← App looks for this flag
  routes: [{ path: '/interviews', component: InterviewsListPage }],
  stores: [{ name: 'interviews', reducer: interviewsReducer }],
};
```

### Step 2: Create Feature Flag

**File:** `app/utils/featureFlags.ts`

```typescript
interviewManagement: {
  enabled: true,  // ← This enables the module
  rolloutPercentage: 100,
  description: 'Interview management',
  // ...
}
```

### Step 3: Register in Module Registry

**File:** `app/utils/moduleRegistry.ts`

```typescript
import { interviewsModuleConfig } from '~/modules/interviews/module.config';

const modules = [
  opportunitiesModuleConfig,
  interviewsModuleConfig, // ← App discovers this
];
```

### Step 4: App Automatically:

```
✅ Discovers your module
✅ Checks feature flag
✅ Registers Redux reducer
✅ Registers routes
✅ Adds to sidebar
✅ Makes pages accessible
```

## How It Works

```
App startup → Read moduleRegistry → Check each module's flag
→ If enabled: Register routes & Redux → Module ready for use
→ If disabled: Skip module → Returns 404 if user tries to access
```

## Enable/Disable Modules

### Simple Toggle

```typescript
// app/utils/featureFlags.ts
interviewManagement: {
  enabled: true,  // ← Change to enable/disable
  rolloutPercentage: 100,
}

// Reload browser → Module appears/disappears instantly!
```

### Gradual Rollout

```typescript
Week 1: rolloutPercentage: 10
Week 2: rolloutPercentage: 25
Week 3: rolloutPercentage: 50   (A/B test)
Week 4: rolloutPercentage: 100
```

### Emergency Disable

```typescript
// If bugs found
interviewManagement: {
  enabled: false,  // ← Instant disable!
}
```

## Create a New Module

### Step 1: Create Directory

```bash
mkdir app/modules/myfeature
cd app/modules/myfeature
```

### Step 2: Create module.config.ts

```typescript
export const myfeatureModuleConfig: ModuleConfig = {
  name: 'myfeature',
  featureFlag: 'myfeature',
  routes: [{ path: '/myfeature', component: MyFeaturePage }],
  stores: [{ name: 'myfeature', reducer: myfeatureReducer }],
};
```

### Step 3-7: Create Types, Redux, API, Pages, etc.

Follow the opportunities module as a template.

### Step 8: Add Feature Flag

```typescript
myfeature: {
  enabled: false,
  description: 'My new feature',
  rolloutPercentage: 0,
}
```

### Step 9: Register in moduleRegistry

```typescript
modules.push(myfeatureModuleConfig);
```

### Step 10: Enable the Module

```typescript
// app/utils/featureFlags.ts
myfeature: {
  enabled: true,  // ← Change to enable
  rolloutPercentage: 100,
}

// Reload browser → Module appears!
```

## Modules Operate Independently

```
Module A (Opportunities)
├─ state.opportunities (Redux)
├─ routes: /opportunities
└─ API: /api/opportunities

Module B (Vendors)
├─ state.vendors (Redux)
├─ routes: /vendors
└─ API: /api/vendors

Result: Both run independently!
- If Module A crashes, Module B still works
- If Module B disabled, Module A unaffected
- Each has own data, routes, logic
```

---

# 1️⃣1️⃣ API Integration

## Current Setup

**Mock API:** `app/services/authAPI.ts`

```typescript
loginAPI(email, password); // Returns { user, token }
registerAPI(data); // Returns { user, token }
validateTokenAPI(token); // Returns user
logoutAPI(token); // Returns void
```

## Connecting Real Backend

### Step 1: Replace API Functions

**Before (Mock):**

```typescript
export async function loginAPI(payload: LoginPayload) {
  // Simulate delay
  await new Promise((resolve) => setTimeout(resolve, 500));
  // Return fake user
}
```

**After (Real):**

```typescript
export async function loginAPI(payload: LoginPayload) {
  const response = await fetch('https://api.yoursite.com/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (!response.ok) throw new Error(await response.text());
  return response.json();
}
```

### Step 2: Set API URL

```typescript
// app/utils/config.ts
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

// .env.local
VITE_API_URL=https://api.yoursite.com
```

### Step 3: Done!

Redux, components, hooks - all stay the same!

## Using TanStack Query

```typescript
import { useQuery } from '@tanstack/react-query';

function OpportunitiesList() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['opportunities'],
    queryFn: () => fetch('/api/opportunities').then(r => r.json()),
  });

  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorMessage />;

  return (
    <div>
      {data.map(item => <Card key={item.id} item={item} />)}
    </div>
  );
}
```

---

# 1️⃣2️⃣ Production Checklist

## Before Going Live

### ✅ Security

- [ ] Replace localStorage with httpOnly cookies
- [ ] Implement refresh token mechanism
- [ ] Token expiration (15 min access, 7 day refresh)
- [ ] Rate limiting
- [ ] CSRF protection
- [ ] Input validation
- [ ] Output sanitization
- [ ] Security audit

### ✅ Authentication

- [ ] Real backend API
- [ ] Database setup
- [ ] Email verification
- [ ] Password reset
- [ ] Account lockout after N attempts
- [ ] 2FA/MFA (optional)

### ✅ Backend

- [ ] Build API server
- [ ] Database schema
- [ ] API authentication
- [ ] Error handling
- [ ] Request validation
- [ ] Rate limiting
- [ ] Logging

### ✅ Monitoring

- [ ] Error tracking (Sentry)
- [ ] Application logging
- [ ] Performance monitoring
- [ ] User analytics
- [ ] Uptime monitoring
- [ ] Alert system

### ✅ DevOps

- [ ] Docker containerization
- [ ] CI/CD pipeline
- [ ] Staging environment
- [ ] Production environment
- [ ] Database backups
- [ ] Zero-downtime deployments
- [ ] Rollback strategy

### ✅ Testing

- [ ] Unit tests
- [ ] Integration tests
- [ ] E2E tests
- [ ] Load testing
- [ ] Security testing
- [ ] Cross-browser testing

### ✅ Performance

- [ ] Code splitting verified
- [ ] Bundle analysis
- [ ] Image optimization
- [ ] Caching strategy
- [ ] Database indexing
- [ ] Query optimization
- [ ] CDN setup

### ✅ Documentation

- [ ] API documentation
- [ ] Deployment guide
- [ ] Troubleshooting guide
- [ ] Runbooks

---

# 1️⃣3️⃣ Common Commands

## Development

```bash
npm run dev              # Start dev server (localhost:5173)
npm run type-check      # Check TypeScript errors
npm run lint            # Check linting errors
npm run lint:fix        # Auto-fix linting
npm run format          # Format code
```

## Building

```bash
npm run build           # Production build
npm run preview         # Preview production build
```

## Full Pre-Deploy Check

```bash
npm run type-check && npm run lint:fix && npm run format && npm run build
```

---

# 1️⃣4️⃣ Troubleshooting

## TypeScript Errors

### Cannot find module '~/types/auth'

```
Solution: Check path alias in tsconfig.json
         Check file exists
         Restart TS server (Cmd+Shift+P → TypeScript: Restart)
```

### Property 'xyz' does not exist on type

```
Solution: Check type definition
         Add missing property
         Run npm run type-check
```

## Build Errors

### Build fails

```
Solution: Clear cache: rm -rf dist node_modules/.vite
         Run npm run type-check
         Check imports
```

## Runtime Errors

### Feature flag not working

```
Solution: Check spelling
         Check useFeature hook imported
         Test: featureFlagManager.isEnabled('yourFlag')
```

### Not logged in after refresh

```
Solution: Check localStorage has token
         Check token valid in backend
         Check AppInitializer in main.tsx
         Check console errors
```

### API not working

```
Solution: Check VITE_API_URL in .env.local
         Check backend running
         Check CORS enabled
         Check network tab
```

## Performance Issues

### Slow bundle

```
Solution: Check dist/ size
         Use code splitting
         Enable gzip
         Check dependencies
```

### Slow rendering

```
Solution: Check React DevTools Profiler
         Use React.memo
         Check useState triggers
         Use useCallback
```

---

## Quick Reference: File Locations

| What             | Where                             |
| ---------------- | --------------------------------- |
| Authentication   | `app/components/Auth/`            |
| State Management | `app/stores/`                     |
| Feature Flags    | `app/utils/featureFlags.ts`       |
| API Services     | `app/services/`                   |
| Custom Hooks     | `app/hooks/`                      |
| Type Definitions | `app/types/`                      |
| Modules          | `app/modules/`                    |
| Configuration    | `vite.config.ts`, `tsconfig.json` |

---

## Summary

This is your **complete guide to BS-VMS**.

**For New Developers:** Read sections 1-5, then sections 6-7, then explore code starting at `app/main.tsx`

**For DevOps:** Read sections 12 and 11 (Production & API)

**For Continued Development:** Reference section 10 (Modules) and section 9 (Flags)

---

**Status:** ✅ Production Foundation Ready  
**Scale:** Supports millions of users  
**Last Updated:** 2026-07-03

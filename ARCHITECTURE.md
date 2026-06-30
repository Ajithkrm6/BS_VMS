# BS-VMS Architecture Overview

## 🏗️ Application Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                      Browser / Client                           │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │              React Application                          │   │
│  │  ┌────────────────────────────────────────────────────┐ │   │
│  │  │         Layout System (LayoutPrimary)             │ │   │
│  │  │  ┌──────────────┐  ┌──────────────────────────┐   │ │   │
│  │  │  │  Sidebar     │  │   TopNavigation          │   │ │   │
│  │  │  │  - Dashboard │  │   - Notifications       │   │ │   │
│  │  │  │  - Vehicles  │  │   - User Menu           │   │ │   │
│  │  │  │  - Reports   │  │                         │   │ │   │
│  │  │  │  - Maintenance│ │                         │   │ │   │
│  │  │  └──────────────┘  └──────────────────────────┘   │ │   │
│  │  │  ┌──────────────────────────────────────────────┐ │ │   │
│  │  │  │     Main Content Area (Route Outlet)        │ │ │   │
│  │  │  │                                              │ │ │   │
│  │  │  │  Dashboard / Vehicles / Maintenance / ...  │ │ │   │
│  │  │  │                                              │ │ │   │
│  │  │  └──────────────────────────────────────────────┘ │ │   │
│  │  └────────────────────────────────────────────────────┘ │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │           State Management Layer                        │   │
│  │  ┌────────────────────┐  ┌────────────────────────┐    │   │
│  │  │  Redux Toolkit     │  │  TanStack Query        │    │   │
│  │  │  (Global State)    │  │  (Server State)        │    │   │
│  │  │  - Auth            │  │  - Vehicles            │    │   │
│  │  │  - UI Theme        │  │  - Maintenance         │    │   │
│  │  │  - Settings        │  │  - API Cache           │    │   │
│  │  │  - Notifications   │  │  - Auto Refetch        │    │   │
│  │  └────────────────────┘  └────────────────────────┘    │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │           Custom Hooks & Services                       │   │
│  │  ┌────────────────────┐  ┌────────────────────────┐    │   │
│  │  │  useApi()          │  │  Custom Hooks          │    │   │
│  │  │  useAppDispatch()  │  │  useAppSelector()      │    │   │
│  │  │  useAppSelector()  │  │  ... (Add as needed)   │    │   │
│  │  └────────────────────┘  └────────────────────────┘    │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
         │
         │ API Calls (useApi hook + TanStack Query)
         │
         ▼
┌─────────────────────────────────────────────────────────────────┐
│                    Backend API Server                           │
│                (Configured via VITE_API_URL)                    │
├─────────────────────────────────────────────────────────────────┤
│  /api/vehicles    /api/maintenance    /api/auth    ...          │
└─────────────────────────────────────────────────────────────────┘
```

## 📊 Data Flow

### Component Rendering Flow

```
User Interaction
      │
      ▼
React Component Event Handler
      │
      ▼
┌──────────────────────┐
│  Redux Action        │
│  (dispatch)          │ ──► Global State Update
└──────────────────────┘         │
      │                          │
      ▼                          ▼
Component Re-renders ◄─── useSelector Hook
      │
      ▼
Updated UI
```

### API Data Flow

```
Component
      │
      ▼
useApi Hook (custom hook)
      │
      ▼
TanStack Query
      │
      ├─ Check Cache ─────► Return cached data (if valid)
      │
      └─ Fetch from API
             │
             ▼
        fetch(VITE_API_URL + endpoint)
             │
             ▼
        Response
             │
             ├─ Cache Data
             │
             └─► Return to Component
                   │
                   ▼
             Component Update
```

## 🎯 Component Hierarchy

```
<App>
  └─ <Layout>
      ├─ <LayoutPrimary>
      │   ├─ <Sidebar>
      │   │   └─ Navigation Links
      │   ├─ <TopNavigation>
      │   │   ├─ Logo/Title
      │   │   └─ User Menu
      │   └─ <Main> (Route Outlet)
      │       ├─ <Dashboard />
      │       ├─ <Vehicles />
      │       │   └─ <Card>
      │       │       ├─ <CardHeader>
      │       │       ├─ <CardTitle>
      │       │       └─ <CardContent>
      │       └─ <Maintenance />
      │
      ├─ <ErrorBoundary>
      │   └─ Error Fallback UI
      │
      └─ Redux Provider
          └─ QueryClientProvider
```

## 📁 Dependency Injection Flow

```
index.html
    │
    ▼
main.tsx (Entry Point)
    │
    ├─ Wraps app with Redux Provider
    ├─ Wraps app with QueryClientProvider
    ├─ Wraps app with ErrorBoundary
    └─ Wraps app with BrowserRouter
         │
         ▼
    <Layout> (root.tsx)
         │
         ▼
    <LayoutPrimary>
         │
         ▼
    Route Components
         │
         ├─ Dashboard
         ├─ Vehicles
         └─ Maintenance
```

## 🔄 Redux Store Structure

```
Redux Store
├─ (Future Slices)
│  ├─ vehicleSlice
│  │  └─ state: { vehicles: [], loading: false, error: null }
│  ├─ maintenanceSlice
│  │  └─ state: { records: [], loading: false, error: null }
│  ├─ authSlice
│  │  └─ state: { user: null, token: null, isAuthenticated: false }
│  └─ uiSlice
│     └─ state: { theme: 'light', sidebarOpen: true }
│
└─ Hooks
   ├─ useAppDispatch() - Type-safe dispatch
   └─ useAppSelector() - Type-safe selector
```

## 🌐 Routing Structure

```
Browser Routes
│
├─ / (Dashboard)
│  └─ <Dashboard />
│
├─ /vehicles (Vehicle Management)
│  └─ <Vehicles />
│     ├─ List View
│     ├─ Detail View (future)
│     └─ Add/Edit Form (future)
│
├─ /maintenance (Maintenance Tracking)
│  └─ <Maintenance />
│     ├─ Schedule View (future)
│     └─ Records (future)
│
└─ (Future Routes)
   ├─ /reports
   ├─ /settings
   ├─ /users
   └─ /auth (login, signup)
```

## 📦 Module Dependencies

```
Layer 1: UI Components
├─ Common Components (Button, Card, Input)
└─ Layout Components (Sidebar, TopNavigation)

    ▲
    │ Uses
    │

Layer 2: Route Components
├─ Dashboard
├─ Vehicles
└─ Maintenance

    ▲
    │ Uses
    │

Layer 3: State Management
├─ Redux Slices
├─ TanStack Query
└─ Custom Hooks (useApi)

    ▲
    │ Fetches
    │

Layer 4: Services & Utilities
├─ Query Client Configuration
├─ API Configuration
└─ Helper Functions

    ▲
    │ Calls
    │

Layer 5: External API
└─ Backend REST Endpoints
```

## 🎨 Styling Architecture

```
Global Styles (root.css)
├─ CSS Variables (theme colors)
│  ├─ --primary
│  ├─ --secondary
│  ├─ --destructive
│  ├─ --muted
│  ├─ --accent
│  └─ ... (11 more color variables)
│
├─ Tailwind Layers
│  ├─ @tailwind base
│  ├─ @tailwind components
│  └─ @tailwind utilities
│
└─ Component Styles
   └─ Applied via Tailwind classes
      ├─ Layout classes
      ├─ Responsive classes (md:, lg:)
      └─ Interactive classes (hover:, focus:)
```

## 🔐 Type Safety Flow

```
TypeScript Compilation
├─ Check app/ folder
├─ Verify against types in app/types/
├─ Path aliases resolution
│  ├─ ~/* → app/*
│  └─ @/* → app/components/*
└─ No errors → Build succeeds
   No errors → .d.ts files generated

Strict Mode Enabled
├─ noImplicitAny: true
├─ strictNullChecks: true
├─ strictFunctionTypes: true
└─ noUnusedLocals: true
```

## 🚀 Build & Deployment Pipeline

```
Source Code
(app/ + configuration files)
    │
    ▼
npm run build
    │
    ├─ TypeScript Compilation (tsc -b)
    │
    ├─ Vite Build Process
    │  ├─ Transform 103 modules
    │  ├─ Render chunks
    │  └─ Code splitting
    │
    └─ Output: dist/ folder
        ├─ index.html
        ├─ assets/
        │  ├─ index-XXX.css (Tailwind)
        │  ├─ index-XXX.js (App code)
        │  ├─ vendor-XXX.js (React, React-DOM)
        │  ├─ state-XXX.js (Redux)
        │  ├─ query-XXX.js (TanStack Query)
        │  └─ router-XXX.js (React Router)
        └─ (Optimized for production)
    │
    ▼
Deploy to Hosting
├─ GitHub Pages
├─ Vercel
├─ Netlify
└─ Any static host
```

## 🎯 Development Workflow

```
Developer
    │
    ├─ npm run dev
    │  └─ Vite Dev Server (port 5173)
    │     ├─ Hot Module Replacement (HMR)
    │     ├─ Fast rebuilds
    │     └─ Live preview
    │
    ├─ npm run lint
    │  └─ ESLint checks code quality
    │
    ├─ npm run type-check
    │  └─ TypeScript validation
    │
    ├─ npm run format
    │  └─ Prettier auto-formatting
    │
    └─ npm run build
       └─ Production build
```

## 🧩 Technology Integration Points

```
┌──────────────────────────────────────────┐
│         Frontend (React + Vite)          │
├──────────────────────────────────────────┤
│ - State: Redux Toolkit + TanStack Query  │
│ - UI: React Components + Tailwind CSS    │
│ - Routing: React Router DOM              │
│ - Types: TypeScript                      │
└──────────────────────────────────────────┘
              │ API Calls │
              ▼           ▼
    ┌───────────────────────────────┐
    │   Backend REST API Server     │
    │   (Connected via fetch)       │
    └───────────────────────────────┘
```

## 📈 Performance Optimization

```
Vite Bundle Splitting
├─ vendor chunk (React, React-DOM)
│  └─ ~3KB gzipped
│
├─ state chunk (Redux)
│  └─ ~7KB gzipped
│
├─ query chunk (TanStack Query)
│  └─ ~9KB gzipped
│
├─ router chunk (React Router)
│  └─ ~51KB gzipped
│
├─ index chunk (App code)
│  └─ ~2.4KB gzipped
│
└─ CSS chunk (Tailwind)
   └─ ~3KB gzipped
```

---

This architecture provides:

- ✅ Scalability for future features
- ✅ Clear separation of concerns
- ✅ Type safety throughout
- ✅ Efficient state management
- ✅ Optimized performance
- ✅ Developer experience with hot reload

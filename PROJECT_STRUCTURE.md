# BS-VMS Project Structure & Standards Documentation

## 📋 Overview

BS-VMS (Bench Sales Vehicle Management System) is a modern, full-featured vehicle management application built following industry best practices and inspired by the BJAC project structure. It provides a scalable foundation for managing fleet operations, maintenance schedules, and reporting.

**Tech Stack:**

- React 18.3 + TypeScript
- Vite (fast build tool)
- Redux Toolkit (state management)
- TanStack Query (server state)
- React Router DOM (routing)
- TailwindCSS (styling)
- shadcn/ui components (component library)

---

## 📁 Complete Folder Structure

```
BS-VMS/
├── app/                                    # Application source code
│   ├── components/                         # React components organized by domain
│   │   ├── Layout/                         # Layout structure components
│   │   │   ├── Primary/                    # Primary layout wrapper
│   │   │   │   ├── index.tsx               # Main layout component
│   │   │   │   ├── Sidebar.tsx             # Navigation sidebar
│   │   │   │   └── TopNavigation.tsx       # Header/top navigation
│   │   │   └── Utility/                    # Layout utilities
│   │   │       ├── ErrorBoundary.tsx       # Error boundary component
│   │   │       └── LoadingSpinner.tsx      # Loading state component
│   │   ├── Auth/                           # Authentication components
│   │   │   └── LoginForm.tsx               # Login form component
│   │   └── Common/                         # Reusable UI components
│   │       ├── Button.tsx                  # Button component (variants)
│   │       ├── Card.tsx                    # Card container component
│   │       └── Input.tsx                   # Form input component
│   │
│   ├── routes/                             # Page-level route components
│   │   ├── index.tsx                       # Dashboard page
│   │   ├── vehicles.tsx                    # Vehicles management page
│   │   └── maintenance.tsx                 # Maintenance tracking page
│   │
│   ├── stores/                             # Redux state management
│   │   └── index.ts                        # Store configuration & hooks
│   │   # Future: Add slices like vehicleSlice, maintenanceSlice, etc.
│   │
│   ├── services/                           # API and external services
│   │   └── queryClient.ts                  # TanStack Query client configuration
│   │
│   ├── hooks/                              # Custom React hooks
│   │   └── useApi.ts                       # Reusable API fetching hook
│   │
│   ├── types/                              # TypeScript type definitions
│   │   └── index.ts                        # Centralized type definitions
│   │
│   ├── utils/                              # Utility functions and helpers
│   │   ├── config.ts                       # Environment configuration
│   │   └── helpers.ts                      # Helper functions
│   │
│   ├── assets/                             # Static assets
│   │   └── icons/                          # SVG icons
│   │
│   ├── main.tsx                            # React app entry point
│   ├── root.tsx                            # Root component wrapper
│   ├── root.css                            # Global styles (Tailwind)
│   └── vite-env.d.ts                       # Vite/environment type definitions
│
├── public/                                 # Publicly served static files
│
├── .github/                                # GitHub specific files
│   └── copilot-instructions.md             # AI assistant instructions
│
├── .vscode/                                # VSCode configuration
│   ├── settings.json                       # Editor settings
│   ├── extensions.json                     # Recommended extensions
│   └── launch.json                         # Debug configuration
│
├── .gitignore                              # Git ignore rules
├── .env.example                            # Environment variables template
├── .eslintrc.json                          # ESLint configuration
├── .prettierrc.json                        # Prettier formatting config
├── index.html                              # HTML entry point
├── package.json                            # Dependencies and scripts
├── postcss.config.js                       # PostCSS configuration
├── tailwind.config.js                      # Tailwind CSS configuration
├── tsconfig.json                           # TypeScript configuration
├── vite.config.ts                          # Vite build configuration
└── README.md                               # Project documentation
```

---

## 🎯 Key Architectural Patterns

### 1. **Layout System** (Inspired by BJAC)

The layout is organized in a primary wrapper pattern with collapsible sidebar and sticky header:

```
LayoutPrimary (app/components/Layout/Primary/index.tsx)
├── Sidebar (Navigation menu)
├── TopNavigation (Header with user menu)
└── Main Content (Route outlet)
```

**File:** `app/components/Layout/Primary/index.tsx`

- Manages layout state (sidebar open/closed)
- Provides responsive layout structure
- Uses Tailwind for styling

### 2. **Component Hierarchy**

Components are organized by responsibility:

```
Layout Components (Structure)
├── Primary/    - Main application wrapper
└── Utility/    - Helper components (ErrorBoundary, LoadingSpinner)

Feature Components (Domain-specific)
├── Auth/       - Authentication features
└── Common/     - Reusable UI components (Button, Card, Input)

Route Components (Pages)
├── index.tsx   - Dashboard
├── vehicles.tsx - Vehicle management
└── maintenance.tsx - Maintenance tracking
```

### 3. **State Management Strategy**

**Redux (Global App State):**

- User authentication state
- Global UI state (theme, notifications)
- Configuration settings

**TanStack Query (Server State):**

- Vehicle data fetching and caching
- Maintenance records
- API responses
- Automatic invalidation and refetching

**Local State (React):**

- Component form inputs
- UI interactions (modals, toggles)
- Temporary state

### 4. **Type Safety Architecture**

All types are centralized in `app/types/index.ts`:

```typescript
// API types
export interface ApiResponse<T> {}

// Domain models
export interface Vehicle {}
export interface MaintenanceRecord {}
export interface User {}
```

Path aliases prevent deep imports:

```typescript
// ❌ Avoid
import { Button } from '../../../components/Common/Button';

// ✅ Use path aliases
import { Button } from '@/Common/Button';
import { Button } from '~/components/Common/Button';
```

---

## 🔄 Workflow Examples

### Adding a New Page

1. **Create route component:** `app/routes/reports.tsx`

   ```typescript
   export function Reports() {
     return (
       <div>
         <h1>Reports</h1>
         {/* Page content */}
       </div>
     );
   }
   ```

2. **Add route:** Update `app/main.tsx`

   ```typescript
   <Route path="/reports" element={<Reports />} />
   ```

3. **Add navigation:** Update `app/components/Layout/Primary/Sidebar.tsx`

### Adding Redux State

1. **Create slice:** `app/stores/vehicleSlice.ts`

   ```typescript
   import { createSlice } from '@reduxjs/toolkit';

   const vehicleSlice = createSlice({
     name: 'vehicle',
     initialState: {},
     reducers: {},
   });
   ```

2. **Add to store:** `app/stores/index.ts`
   ```typescript
   export const store = configureStore({
     reducer: {
       vehicle: vehicleSlice.reducer,
     },
   });
   ```

### Using TanStack Query

```typescript
import { useApi } from '~/hooks/useApi';

export function VehiclesList() {
  const { data: vehicles, isLoading } = useApi('/vehicles');

  if (isLoading) return <LoadingSpinner />;

  return (
    <div>
      {vehicles?.map(v => <VehicleCard key={v.id} vehicle={v} />)}
    </div>
  );
}
```

---

## 🎨 Styling Standards

### Tailwind CSS Approach

**Global Styles** (`app/root.css`):

- CSS variables for theme colors
- Base element styles
- Component-level utility classes

**Component Styling**:

```typescript
export function Button({ variant = 'primary' }) {
  const variantStyles = {
    primary: 'bg-primary text-primary-foreground hover:bg-primary/90',
    secondary: 'bg-secondary text-secondary-foreground',
  };

  return (
    <button className={`rounded font-medium ${variantStyles[variant]}`}>
      {children}
    </button>
  );
}
```

**Color System** (from `tailwind.config.js`):

- Primary: Main brand color
- Secondary: Accent color
- Destructive: Error/delete actions
- Muted: Disabled/secondary text
- Background/Foreground: Text on backgrounds

### Responsive Design

```typescript
// Mobile-first approach
<div className="w-full md:w-1/2 lg:w-1/3">
  {/* Full width on mobile, half on tablet, third on desktop */}
</div>
```

---

## 🔧 Configuration Files Explained

### `vite.config.ts`

- Build tool configuration
- Plugin setup (React, Tailwind, path aliases)
- Dev server configuration (port 5173)
- Build optimization and chunking

### `tsconfig.json`

- TypeScript compiler options
- Strict type checking enabled
- Path aliases (~/_, @/_)
- React JSX support

### `tailwind.config.js`

- Theme color variables
- Extended utilities
- Plugin configuration
- Content paths for purging

### `.eslintrc.json`

- Code quality rules
- React hooks validation
- TypeScript support
- Prettier integration

### `.prettierrc.json`

- Code formatting standards
- Line length: 100 characters
- Semi-colons enabled
- Single quotes for strings

### `package.json` Scripts

| Script               | Purpose                                  |
| -------------------- | ---------------------------------------- |
| `npm run dev`        | Start development server with hot reload |
| `npm run build`      | Production build with optimization       |
| `npm run preview`    | Preview production build locally         |
| `npm run type-check` | TypeScript validation                    |
| `npm run lint`       | Check code quality issues                |
| `npm run lint:fix`   | Auto-fix fixable lint issues             |
| `npm run format`     | Format code with Prettier                |

---

## 📦 Dependencies Overview

### Core Runtime

- **react (18.3)**: UI library
- **react-dom (18.3)**: React rendering for web
- **react-router-dom (6.28)**: Client-side routing

### State Management

- **@reduxjs/toolkit (2.0)**: Redux with modern API
- **react-redux (9.1)**: React bindings for Redux
- **@tanstack/react-query (5.57)**: Server state management

### UI & Styling

- **tailwindcss (3.4)**: Utility-first CSS framework
- **@shadcn/ui**: Component library (ready to integrate)
- **lucide-react**: Icon library

### Development Tools

- **typescript (5.6)**: Type safety
- **vite (5.4)**: Fast build tool
- **@vitejs/plugin-react (4.3)**: React support for Vite
- **eslint & prettier**: Code quality and formatting

---

## 🚀 Performance Optimizations

### Bundle Splitting

Routes are configured in `vite.config.ts` with manual chunks:

```javascript
// Routes, state management, and query libraries in separate chunks
// Reduces initial bundle size
```

### Query Caching

TanStack Query configured with:

- 5-minute stale time
- 10-minute cache time
- Automatic refetch on window focus
- Optimistic updates support

### React Optimization

- Functional components with hooks
- Memoization ready for expensive components
- Error boundary for error isolation

---

## 🔐 Security Considerations

1. **TypeScript Strict Mode**: Catches many bugs at compile time
2. **Environment Variables**: Sensitive data in `.env.local` (never commit)
3. **CORS Configuration**: API configured via environment variables
4. **Input Validation**: Form validation and sanitization needed
5. **Error Boundaries**: Prevents white-screen crashes

---

## 🧪 Testing Readiness

Structure supports adding:

- **Unit Tests**: Jest with vitest
- **Component Tests**: React Testing Library
- **E2E Tests**: Playwright or Cypress
- **Type Tests**: ts-expect-error patterns

Example test structure:

```
tests/
├── unit/
├── components/
└── e2e/
```

---

## 📚 Standards Comparison with BJAC

| Aspect     | BS-VMS            | BJAC Reference               |
| ---------- | ----------------- | ---------------------------- |
| Build Tool | Vite              | React Router v7 (Full-stack) |
| Routing    | React Router DOM  | File-based (React Router)    |
| State      | Redux + Query     | Custom Redux setup           |
| Styling    | TailwindCSS       | TailwindCSS + custom         |
| Layout     | Primary + Utility | Primary + Utility + Root     |
| Types      | Centralized       | Centralized                  |

**Key Differences:**

- BS-VMS is SPA (Single Page App) vs BJAC's full-stack framework
- Simpler deployment without server-side rendering
- Focus on frontend-only development

---

## 🛠️ Development Workflow

1. **Start Dev Server**

   ```bash
   npm run dev
   ```

2. **Create Components** in `app/components/`

3. **Add Routes** in `app/routes/` and `app/main.tsx`

4. **Manage State** with Redux slices in `app/stores/`

5. **Type Everything** in `app/types/`

6. **Check Quality**

   ```bash
   npm run type-check
   npm run lint
   npm run format
   ```

7. **Build for Production**
   ```bash
   npm run build
   npm run preview
   ```

---

## 🎓 Learning Path

1. **Understanding Layout**: Review `app/components/Layout/`
2. **Component Patterns**: Check `app/components/Common/`
3. **Routing**: Examine `app/routes/` and `app/main.tsx`
4. **State Management**: Study `app/stores/` structure
5. **Type Safety**: Explore `app/types/`
6. **Advanced**: Add Redux slices, API integration, custom hooks

---

## 📖 Next Steps

1. **Setup Complete ✅** - Project structure initialized
2. **Environment Setup** - Configure `.env.local`
3. **Feature Development** - Build vehicle management features
4. **Redux Integration** - Add feature slices for data management
5. **API Integration** - Connect to backend services
6. **Testing** - Add test suite
7. **Deployment** - Build and deploy to production

---

## 📞 Support Resources

- **TypeScript Docs**: https://www.typescriptlang.org/docs/
- **React Docs**: https://react.dev
- **Vite Docs**: https://vitejs.dev
- **Redux Toolkit**: https://redux-toolkit.js.org
- **TanStack Query**: https://tanstack.com/query
- **Tailwind CSS**: https://tailwindcss.com

---

**Project created with modern best practices following BJAC project standards.**

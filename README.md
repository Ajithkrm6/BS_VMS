# BS-VMS - Vendor Management System

A modern Vehicle Management System built with React, Vite, Redux, TailwindCSS, and TanStack Query.

## Project Structure

```
bs-vms/
├── app/
│   ├── components/
│   │   ├── Layout/
│   │   │   ├── Primary/          # Main layout component (Sidebar, TopNavigation)
│   │   │   └── Utility/          # Utility components (ErrorBoundary, LoadingSpinner)
│   │   ├── Auth/                 # Authentication components
│   │   └── Common/               # Shared UI components (Button, Card, Input)
│   ├── routes/                   # Route components
│   ├── stores/                   # Redux store configuration
│   ├── services/                 # API services and query client
│   ├── hooks/                    # Custom React hooks
│   ├── types/                    # TypeScript type definitions
│   ├── utils/                    # Utility functions and config
│   ├── assets/                   # Images, icons, etc.
│   ├── main.tsx                  # Application entry point
│   ├── root.tsx                  # Root component
│   ├── root.css                  # Global styles
│   └── vite-env.d.ts            # Vite environment types
├── public/                       # Static assets
├── index.html                    # HTML entry point
├── package.json                  # Dependencies and scripts
├── tsconfig.json                # TypeScript configuration
├── vite.config.ts               # Vite configuration
├── tailwind.config.js            # Tailwind CSS configuration
├── .eslintrc.json               # ESLint configuration
├── .prettierrc.json             # Prettier configuration
└── .env.example                 # Environment variables template
```

## Tech Stack

- **React 18.3**: UI library
- **Vite**: Build tool and development server
- **Redux Toolkit**: State management
- **React Redux**: React bindings for Redux
- **TanStack Query (React Query)**: Server state management
- **React Router DOM**: Client-side routing
- **TailwindCSS**: Utility-first CSS framework
- **TypeScript**: Type safety
- **ESLint**: Code linting
- **Prettier**: Code formatting

## Getting Started

### Installation

```bash
# Navigate to the project
cd BS-VMS

# Install dependencies
npm install
# or
pnpm install
# or
yarn install
```

### Development

```bash
npm run dev
```

This will start the Vite development server at `http://localhost:5173`.

### Building

```bash
npm run build
```

### Type Checking

```bash
npm run type-check
```

### Linting

```bash
# Check for lint errors
npm run lint

# Fix lint errors
npm run lint:fix
```

### Formatting

```bash
# Check formatting
npm run format:check

# Fix formatting
npm run format
```

## Project Standards (Inspired by BJAC)

### Component Structure

- **Layout Components**: Organized in `app/components/Layout/` with primary (Sidebar, TopNavigation) and utility (ErrorBoundary, LoadingSpinner) components
- **Common Components**: Reusable UI components like Button, Card, Input
- **Route Components**: Page-level components in `app/routes/`

### Naming Conventions

- Component files use PascalCase (e.g., `Sidebar.tsx`)
- Export component functions with same name as file
- Type files use lowercase (e.g., `index.ts`)

### State Management

- **Redux** for global app state
- **TanStack Query** for server state and API caching
- Store configuration in `app/stores/index.ts`

### API Integration

- Query client configured in `app/services/queryClient.ts`
- Custom hooks in `app/hooks/useApi.ts`
- Environment variables in `.env.example`

### Type Safety

- Centralized types in `app/types/index.ts`
- TypeScript strict mode enabled
- Path aliases configured (`~/*` for app folder)

### Styling

- Tailwind CSS for utility classes
- CSS variables for theme colors
- Custom Tailwind configuration for shadcn components support
- Global styles in `app/root.css`

## Key Features

### Layout System

The primary layout includes:

- **Sidebar**: Collapsible navigation menu
- **TopNavigation**: Header with notifications and user menu
- **Main Content Area**: Dynamic main content with responsive design

### Common Components

- **Button**: Variants (primary, secondary, destructive) and sizes (sm, md, lg)
- **Card**: Container component with header, title, and content slots
- **Input**: Form input with label and error handling

### Error Handling

- `ErrorBoundary` component for catching React errors
- Global error state management

### API Integration

- Configured through environment variables
- TanStack Query for efficient data fetching and caching
- Custom `useApi` hook for easy API calls

## Environment Variables

Copy `.env.example` to `.env.local` and configure:

```env
VITE_API_URL=http://localhost:3000/api
VITE_API_TIMEOUT=30000
VITE_APP_ENV=development
VITE_APP_NAME=BS-VMS
VITE_ENABLE_DEBUG=false
```

## Contributing

- Follow the established component structure
- Use TypeScript for type safety
- Format code with Prettier before committing
- Run ESLint to check for issues

## Future Enhancements

- Add authentication system
- Implement Redux slices for vehicle and maintenance management
- Create forms for vehicle management
- Add data tables for displaying vehicle lists
- Implement reporting features
- Add dark mode support
- Integrate real API endpoints

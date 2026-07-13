# Copilot Instructions for Bridge Talent Project

## Project Overview

Bridge Talent is a modern web application built with React, Vite, Redux, TailwindCSS, and TanStack Query for recruiting and vendor management.

## Technology Stack

- **Frontend Framework**: React 18.3
- **Build Tool**: Vite 5.x
- **State Management**: Redux Toolkit + React Redux
- **Server State**: TanStack Query (React Query)
- **Routing**: React Router DOM 6
- **Styling**: TailwindCSS 3.4 + PostCSS
- **Type Safety**: TypeScript 5.6
- **Code Quality**: ESLint + Prettier

## Project Structure

### Key Directories

- `app/components/` - React components organized by feature
  - `Layout/` - Layout components (Sidebar, TopNavigation, utilities)
  - `Auth/` - Authentication components
  - `Common/` - Reusable UI components (Button, Card, Input)
- `app/routes/` - Page-level route components
- `app/stores/` - Redux store configuration and slices
- `app/services/` - API services and query client
- `app/hooks/` - Custom React hooks
- `app/types/` - TypeScript type definitions
- `app/utils/` - Utility functions and configuration
- `app/assets/` - Static assets (icons, images)
- `public/` - Publicly served static files

### Configuration Files

- `vite.config.ts` - Vite build configuration
- `tsconfig.json` - TypeScript configuration
- `tailwind.config.js` - Tailwind CSS theme configuration
- `.eslintrc.json` - ESLint rules
- `.prettierrc.json` - Code formatting rules

## Development Standards

### Component Naming & Structure

- Components are PascalCase (e.g., `Sidebar.tsx`)
- One component per file, export matches filename
- Props interfaces defined at top of file
- Functional components with React hooks

### State Management

- **Global App State**: Redux Toolkit in `app/stores/`
- **Server State**: TanStack Query via custom hooks
- **Local Component State**: React `useState` hook

### Type Safety

- All files use TypeScript
- Strict mode enabled
- Type definitions centralized in `app/types/`
- Path aliases: `~/*` → `app/*`, `@/*` → `app/components/*`

### Code Style

- Formatted with Prettier on save
- ESLint validation enabled
- Follow existing patterns in codebase

## Common Tasks

### Running the Application

```bash
npm run dev          # Start development server (port 5173)
npm run build        # Production build
npm run preview      # Preview production build
npm run type-check   # TypeScript validation
npm run lint         # Check for linting errors
npm run lint:fix     # Auto-fix linting errors
npm run format       # Format code with Prettier
```

### Adding New Features

1. **New Page**: Add route component in `app/routes/`
2. **New Component**: Add to `app/components/` organized by feature
3. **New Redux Slice**: Add to `app/stores/` with actions and reducers
4. **New Custom Hook**: Add to `app/hooks/`
5. **API Integration**: Use custom `useApi` hook or TanStack Query

### Adding Dependencies

```bash
npm install <package-name>
npm run type-check   # Verify types after install
```

## Environment Configuration

Copy `.env.example` to `.env.local` and configure:

- `VITE_API_URL` - API backend endpoint
- `VITE_API_TIMEOUT` - Request timeout in ms
- `VITE_APP_ENV` - Environment (development/production)
- `VITE_ENABLE_DEBUG` - Enable debug logging

## VSCode Settings

Recommended extensions (auto-install from `.vscode/extensions.json`):

- ESLint - Code validation
- Prettier - Code formatting
- Tailwind CSS IntelliSense - CSS class completion

## Best Practices

### Code Quality

- Write TypeScript - avoid `any` type
- Keep components focused and reusable
- Use path aliases to avoid relative imports
- Organize code by feature/domain

### Performance

- Use React.memo for expensive components
- Implement code splitting via React Router
- Leverage TanStack Query caching
- Optimize images and assets

### Accessibility

- Use semantic HTML elements
- Include ARIA labels where needed
- Test keyboard navigation
- Follow WCAG 2.1 guidelines

### Testing & Debugging

- Use browser DevTools for React/Redux debugging
- React Query DevTools available in dev mode
- Type checking catches many errors before runtime
- ESLint identifies code issues

## Common Patterns

### Using Redux State

```typescript
import { useAppDispatch, useAppSelector } from '~/stores';

export function MyComponent() {
  const dispatch = useAppDispatch();
  const value = useAppSelector(state => state.mySlice.value);

  return <div>{value}</div>;
}
```

### Using TanStack Query

```typescript
import { useApi } from '~/hooks/useApi';

export function MyComponent() {
  const { data, isLoading, error } = useApi('/endpoint');

  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorMessage />;
  return <div>{data}</div>;
}
```

### Creating Components

```typescript
import { Card, CardHeader, CardTitle, CardContent } from '~/components/Common/Card';

interface MyComponentProps {
  title: string;
  onAction?: () => void;
}

export function MyComponent({ title, onAction }: MyComponentProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <button onClick={onAction}>Action</button>
      </CardContent>
    </Card>
  );
}
```

## Resources & References

- [React Documentation](https://react.dev)
- [Vite Guide](https://vitejs.dev)
- [Redux Toolkit Docs](https://redux-toolkit.js.org)
- [TanStack Query Docs](https://tanstack.com/query)
- [React Router Docs](https://reactrouter.com)
- [Tailwind CSS Docs](https://tailwindcss.com)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)

## Getting Help

- Check existing components for patterns
- Review TypeScript errors for guidance
- Use `npm run lint:fix` to auto-fix issues
- Check console for runtime errors and warnings

## Future Enhancements

- Add authentication system
- Implement vehicle management CRUD operations
- Create maintenance scheduling features
- Add reporting and analytics
- Implement real-time updates via WebSockets
- Add dark mode support
- Implement progressive web app (PWA) features

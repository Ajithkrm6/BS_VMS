import { createBrowserRouter } from 'react-router-dom';
import authRoutes from '~/Auth/routes/route';
import { Dashboard } from './index';
import { Opportunity } from './opportunity';
import { Bench } from './bench';
import { ProtectedRoute } from '~/Auth/components/ProtectedRoute';

const router = createBrowserRouter([
  ...authRoutes,
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    ),
  },
  {
    path: '/opportunities',
    element: (
      <ProtectedRoute>
        <Opportunity />
      </ProtectedRoute>
    ),
  },
  {
    path: '/bench',
    element: (
      <ProtectedRoute>
        <Bench />
      </ProtectedRoute>
    ),
  },
]);

export default router;

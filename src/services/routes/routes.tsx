import { createBrowserRouter } from 'react-router-dom';
import LoginPage from '../../pages/login-page';
import ErrorPage from '../../pages/error-page';
import HydrateFallback from '../../pages/hydrate-fallback';
import TransactionPage from '../../pages/transaction-page';
import RrotectedRoute from './protected-route';
import PublicRoute from './public-route';

export const router = createBrowserRouter([
  {
    path: '/authentication',
    element: <PublicRoute />,
    children: [
      {
        path: 'login',
        element: <LoginPage />,
      },
    ],
    errorElement: <ErrorPage />,
    hydrateFallbackElement: <HydrateFallback />,
  },
  {
    path: '/',
    element: <RrotectedRoute />,
    children: [
      {
        index: true,
        element: <TransactionPage />,
      },
    ],
    errorElement: <ErrorPage />,
    hydrateFallbackElement: <HydrateFallback />,
  },
  {
    path: '*',
    element: <ErrorPage />,
  },
]);

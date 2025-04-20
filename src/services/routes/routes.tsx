import { createBrowserRouter } from 'react-router-dom';
import LoginPage from '../../pages/login-page';
import ErrorPage from '../../pages/error-page';
import HydrateFallback from '../../pages/hydrate-fallback';
import TransactionPage from '../../pages/transaction-page';
import RrotectedRoute from './protected-route';
import { loginLoader } from '../loaders/auth-loaders';

export const router = createBrowserRouter([
  {
    path: '/authentication',
    children: [
      {
        path: 'login',
        element: <LoginPage />,
      },
    ],
    errorElement: <ErrorPage />,
    hydrateFallbackElement: <HydrateFallback />,
    loader: loginLoader,
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

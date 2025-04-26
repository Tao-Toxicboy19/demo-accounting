import { createBrowserRouter, Outlet } from 'react-router-dom';
import LoginPage from '../../pages/login-page';
import ErrorPage from '../../pages/error-page';
import HydrateFallback from '../../pages/hydrate-fallback';
import TransactionPage from '../../pages/transaction-page';
import RrotectedRoute from './protected-route';
import { loginLoader } from '../loaders/auth-loaders';
import NewTransactionPage from '../../pages/new-transaction-page';
import MainLayout from '../../layouts/main-layout';

export const router = createBrowserRouter([
  {
    path: '/authentication',
    element: <Outlet />,
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
        element: <MainLayout />,
        children: [
          {
            index: true,
            element: <TransactionPage />,
          },
          {
            path: '/new/transaction',
            element: <NewTransactionPage />,
          },
        ],
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

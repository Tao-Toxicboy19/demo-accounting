import { createBrowserRouter, Outlet } from 'react-router-dom';
import LoginPage from '../../pages/login-page';
import ErrorPage from '../../pages/error-page';
import HydrateFallback from '../../pages/hydrate-fallback';
import TransactionPage from '../../pages/transaction-page';
import RrotectedRoute from './protected-route';
import { loginLoader } from '../loaders/auth-loaders';
import MainLayout from '../../layouts/main-layout';
import FormTransactionPage from '../../pages/form-transaction-page';
import FormInstallment from '../../pages/form-installment';
import InstallmentPage from '../../pages/installment-page';

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
            path: '/form/transaction',
            element: <FormTransactionPage />,
          },
          {
            path: '/list/installment',
            element: <InstallmentPage />,
          },
          {
            path: '/form/installment',
            element: <FormInstallment />,
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

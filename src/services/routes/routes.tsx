import { createBrowserRouter, Outlet } from 'react-router-dom';
import LoginPage from '../../pages/login-page';
import HydrateFallback from '../../pages/hydrate-fallback';
import TransactionPage from '../../pages/transaction-page';
import ProtectedRoute from './protected-route';
import { loginLoader } from '../loaders/auth-loaders';
import { path } from './route-path';
import DashboardPage from '../../pages/dashboard-page';
import AppLayout from '../../layouts/app-layout';
import InstallmentPage from '../../pages/installment-page';
import NotFound from '../../pages/not-found';
import SavingGoalPage from '../../pages/saving-goal-page';

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
    errorElement: <NotFound />,
    hydrateFallbackElement: <HydrateFallback />,
    loader: loginLoader,
  },
  {
    path: path.root,
    element: <ProtectedRoute />,
    children: [
      {
        element: <AppLayout />,
        children: [
          {
            index: true,
            element: <DashboardPage />,
          },
          {
            path: path.transaction.list,
            element: <TransactionPage />,
          },
          {
            path: path.installment.list,
            element: <InstallmentPage />,
          },
          {
            path: path.savingGoal.list,
            element: <SavingGoalPage />,
          },
        ],
      },
    ],
    errorElement: <NotFound />,
    hydrateFallbackElement: <HydrateFallback />,
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);

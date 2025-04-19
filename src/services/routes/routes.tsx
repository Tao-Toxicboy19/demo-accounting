import { createBrowserRouter } from 'react-router-dom';
import LoginPage from '../../pages/login-page';
import ErrorPage from '../../pages/error-page';
import HydrateFallback from '../../pages/hydrate-fallback';
import TransactionPage from '../../pages/transaction-page';
import { loginLoader, protectedLoader } from '../loaders/auth-loaders';
import { path } from './route-path';

export const router = createBrowserRouter([
  {
    path: path.login,
    element: <LoginPage />,
    errorElement: <ErrorPage />,
    hydrateFallbackElement: <HydrateFallback />,
    loader: loginLoader,
  },
  {
    path: path.root,
    element: <TransactionPage />,
    errorElement: <ErrorPage />,
    hydrateFallbackElement: <HydrateFallback />,
    index: true,
    loader: protectedLoader,
  },
]);

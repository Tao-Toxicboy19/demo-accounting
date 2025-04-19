import { JSX } from 'react';
import LoginPage from './pages/login-page';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ErrorPage from './pages/error-page';
import TransactionPage from './pages/transaction-page';
import { loginLoader, protectedLoader } from './services/loaders/auth-loaders';
import HydrateFallback from './pages/hydrate-fallback';

export default function App(): JSX.Element {
  const router = createBrowserRouter([
    {
      path: '/login',
      element: <LoginPage />,
      errorElement: <ErrorPage />,
      hydrateFallbackElement: <HydrateFallback />,
      loader: loginLoader,
    },
    {
      path: '/',
      element: <TransactionPage />,
      errorElement: <ErrorPage />,
      hydrateFallbackElement: <HydrateFallback />,
      index: true,
      loader: protectedLoader,
    },
  ]);

  return (
    <main className="h-screen">
      <RouterProvider router={router} />
    </main>
  );
}

import { JSX } from 'react';
import { RouterProvider } from 'react-router-dom';
import { router } from './services/routes/routes';
import { useAuth } from './services/hooks/use-auth';

export default function App(): JSX.Element {
  useAuth();

  return (
    <main className="h-screen">
      <RouterProvider router={router} />
    </main>
  );
}

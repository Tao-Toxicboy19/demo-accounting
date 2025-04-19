import { JSX } from 'react';
import { RouterProvider } from 'react-router-dom';
import { router } from './services/routes/routes';

export default function App(): JSX.Element {
  return (
    <main className="h-screen">
      <RouterProvider router={router} />
    </main>
  );
}

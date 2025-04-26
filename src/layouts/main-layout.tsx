import { Outlet } from 'react-router-dom';
import { JSX } from 'react';
import Header from '../components/header';

export default function MainLayout(): JSX.Element {
  return (
    <div>
      <Header />
      <main className="container mx-auto mt-10">
        <Outlet />
      </main>
    </div>
  );
}

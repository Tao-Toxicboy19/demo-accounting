import { JSX, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/common/header';
import { setIsMobile, useAppDispatch } from '../services/store';

export default function MainLayout(): JSX.Element {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const handleResize = () => {
      dispatch(setIsMobile(window.innerWidth < 768));
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [dispatch]);

  return (
    <div>
      <Header />
      <main className="container mx-auto mt-3">
        <Outlet />
      </main>
    </div>
  );
}

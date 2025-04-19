import { redirect } from 'react-router-dom';
import { currentUser } from '../current-user';

export const loginLoader = async (): Promise<Response | null> => {
  const user = await currentUser();
  if (user) return redirect('/');
  return null;
};

export const protectedLoader = async (): Promise<Response | null> => {
  const user = await currentUser();
  if (!user) return redirect('/login');
  return null;
};

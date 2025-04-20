// import { redirect } from 'react-router-dom';
// import { User, onAuthStateChanged } from 'firebase/auth';
// import { auth } from '../../firebase';

// export const loginLoader = async (): Promise<Response | null> => {
//   const user = await currentUser();
//   if (user) return redirect('/');
//   return null;
// };

// async function currentUser(): Promise<User | null> {
//   return await new Promise((resolve) => {
//     const unsubscribe = onAuthStateChanged(auth, (user) => {
//       unsubscribe();
//       resolve(user);
//     });
//   });
// }

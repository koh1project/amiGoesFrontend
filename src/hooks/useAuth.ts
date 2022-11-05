import { useEffect, useState } from 'react';
import { auth } from '../utils/firebase';

export const useAuth = () => {
  const [user, setUser] = useState<{ uid: string } | null>(null);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      }
    });
  }, []);
  return user;
};

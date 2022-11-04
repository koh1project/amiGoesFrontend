import { useEffect, useState } from 'react';
import { auth } from '../utils/firebase';

export const useAuth = () => {
  const [user, setUser] = useState();

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      }
    });
  }, []);
  return user;
};

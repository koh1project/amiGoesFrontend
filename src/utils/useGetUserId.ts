import { useEffect, useState } from 'react';
import { auth } from './firebase';

const useGetUserId = () => {
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const userId = auth.onAuthStateChanged((user) => {
      if (user) {
        setUserId(user.uid);
      } else {
        setUserId(null);
      }
    });
    return () => userId();
  }, [userId]);

  return userId;
  // console.log(userId);
};
export default useGetUserId;

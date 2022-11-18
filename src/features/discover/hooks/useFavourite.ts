import { useState, useEffect } from 'react';
import { useAuthContext } from '../../../components/auth/AuthContextProvider';
import {
  getFavorites,
  updateFavorites,
} from '../../../services/discover.service';

export const useFavorites = () => {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [userId, setUserId] = useState<string>();

  const { user } = useAuthContext();

  useEffect(() => {
    if (user) {
      setUserId(user.uid);
    } else {
      setUserId('5bhhc4f0516eg');
    }
  }, [user]);

  const handleUpdateFavorites = async (place_id: string) => {
    if (!userId || !place_id) {
      return;
    }

    try {
      await updateFavorites(userId, place_id);

      setFavorites((prev) => {
        const isFavorited = prev.includes(place_id);
        if (isFavorited) {
          return prev.filter((id) => id !== place_id);
        }
        return [...prev, place_id];
      });
    } catch (error) {
      console.error('API updateFavorites ERROR', error);
      throw error;
    }
  };

  useEffect(() => {
    if (!userId) {
      return;
    }

    console.log('userId', userId);

    (async function () {
      const { data: favoriteList } = await getFavorites(userId);
      console.log('favoriteList: ', favoriteList);
      if (favoriteList) {
        setFavorites(favoriteList);
      }
    })();
  }, [user]);

  return { favorites, handleUpdateFavorites };
};

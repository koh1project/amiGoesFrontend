import { useState, useEffect } from 'react';
import {
  getFavorites,
  updateFavorites,
} from '../../../services/discover.service';

export const useFavorites = (userId = '5bhhc4f0516eg') => {
  const [favorites, setFavorites] = useState<string[]>([]);

  const handleUpdateFavorites = async (place_id: string) => {
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
    (async function () {
      const { data: favoriteList } = await getFavorites(userId);
      if (favoriteList) {
        setFavorites(favoriteList);
      }
    })();
  }, []);

  return { favorites, handleUpdateFavorites };
};

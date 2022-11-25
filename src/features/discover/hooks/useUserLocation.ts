import * as Location from 'expo-location';
import { useCallback, useEffect, useState } from 'react';

import { UserLocation } from '../../../types/discover';

export const useUserLocation = () => {
  const [location, setLocation] = useState<UserLocation>();

  const readLocation = useCallback(async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      return;
    }

    const location = await Location.getCurrentPositionAsync({});
    setLocation(location);
  }, []);

  useEffect(() => {
    if (location) {
      return;
    }

    readLocation();
  }, [location]);

  return { location, readLocation };
};

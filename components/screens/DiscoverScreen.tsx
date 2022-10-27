import { useCallback, useEffect, useState } from 'react';
import { Text } from 'react-native';
import { getDiscover } from '../../services/discover.service';

export const DiscoverScreen: React.FC = () => {
  const [places, setPlaces] = useState<any[]>([]);

  const fetchPlaces = useCallback(async () => {
    const result = await getDiscover();
    const { data } = result;
    console.log('data: ', data);

    setPlaces(data);
    return data;
  }, []);

  useEffect(() => {
    fetchPlaces().catch((error) => {
      console.error(error);
    });
  }, [fetchPlaces]);

  return <Text>Discover</Text>;
};

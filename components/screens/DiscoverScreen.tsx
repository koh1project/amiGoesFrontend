import * as Location from 'expo-location';
import { ScrollView } from 'native-base';
import { useCallback, useEffect, useState } from 'react';
import { Text } from 'react-native';
import { PlacesCarousel } from '../../features/discover/components/PlacesCarousel';
import { getDiscover } from '../../services/discover.service';
import { GetDiscoverResponse, UserLocation } from '../../types/discover';
import { SecondaryHeading } from '../texts/Heading';

export const DiscoverScreen: React.FC = () => {
  const [places, setPlaces] = useState<GetDiscoverResponse>();
  const [location, setLocation] = useState<UserLocation>();

  const fetchPlaces = useCallback(async () => {
    const result = await getDiscover();
    const { data } = result;
    console.log({ data });

    setPlaces(data);
    return data;
  }, []);

  const readLocation = useCallback(async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      return;
    }

    const location = await Location.getCurrentPositionAsync({});
    console.log('location: ', location);
    setLocation(location);
  }, []);

  useEffect(() => {
    fetchPlaces().catch((error) => {
      console.error(error);
    });
  }, [fetchPlaces]);

  useEffect(() => {
    if (location) {
      return;
    }

    readLocation();
  }, [location, readLocation]);

  let content = <></>;
  if (places) {
    content = (
      <>
        <SecondaryHeading>Parks</SecondaryHeading>
        <PlacesCarousel places={places['parks']} userLocation={location} />
        <SecondaryHeading>Restaurants</SecondaryHeading>
        <PlacesCarousel
          places={places['restaurants']}
          userLocation={location}
        />
        <SecondaryHeading>Entertainment</SecondaryHeading>
        <PlacesCarousel
          places={places['entertainment']}
          userLocation={location}
        />
        <SecondaryHeading>Sports</SecondaryHeading>
        <PlacesCarousel places={places['sports']} userLocation={location} />
      </>
    );
  }

  return (
    <>
      <Text>Discover</Text>
      <Text>Search Box</Text>
      <ScrollView>{content}</ScrollView>
    </>
  );
};

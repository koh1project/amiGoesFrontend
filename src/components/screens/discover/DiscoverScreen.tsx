import * as Location from 'expo-location';
import { Input, ScrollView, View } from 'native-base';
import React, { useCallback, useEffect, useState } from 'react';
import { Text } from 'react-native';
import { PlacesCarousel } from '../../../features/discover/components/PlacesCarousel';
import { getDiscover } from '../../../services/discover.service';
import { GetDiscoverResponse, UserLocation } from '../../../types/discover';
import { SecondaryHeading } from '../../texts/Heading';

export const DiscoverScreen: React.FC = () => {
  const [places, setPlaces] = useState<GetDiscoverResponse>();
  const [location, setLocation] = useState<UserLocation>();

  const fetchPlaces = useCallback(async () => {
    const result = await getDiscover();
    const { data } = result;

    setPlaces(data);
    return data;
  }, []);

  const readLocation = useCallback(async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      return;
    }

    const location = await Location.getCurrentPositionAsync({});
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
    <View style={{ padding: 10 }}>
      <Text>Discover</Text>
      <Input placeholder="Search"></Input>
      <ScrollView>{content}</ScrollView>
    </View>
  );
};

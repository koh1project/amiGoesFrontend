import { Input, ScrollView, View } from 'native-base';
import React, { useCallback, useEffect, useState } from 'react';
import { Text } from 'react-native';
import { PlacesCarousel } from '../../features/discover/components/PlacesCarousel';
import { useUserLocation } from '../../features/discover/hooks/useUserLocation';
import { getDiscover } from '../../services/discover.service';
import { GetDiscoverResponse } from '../../types/discover';
import { SecondaryHeading } from '../texts/Heading';

export const DiscoverScreen: React.FC = () => {
  const [places, setPlaces] = useState<GetDiscoverResponse>();
  const { location } = useUserLocation();

  const fetchPlaces = useCallback(async () => {
    const result = await getDiscover();
    const { data } = result;
    setPlaces(data);
    return data;
  }, []);
  useEffect(() => {
    fetchPlaces().catch((error) => {
      console.error(error);
    });
  }, [fetchPlaces]);

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

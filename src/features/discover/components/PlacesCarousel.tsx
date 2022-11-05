import { Text, ScrollView } from 'native-base';
import React, { FC } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Place, UserLocation } from '../../../types/discover';

import { PlaceCard } from './PlaceCard';

type PlacesCarouselProps = {
  places: Place[];
  userLocation?: UserLocation;
};

export const PlacesCarousel: FC<PlacesCarouselProps> = ({
  places,
  userLocation,
}) => {
  const navigation = useNavigation();
  if (!places || places.length === 0) {
    return <Text>No places</Text>;
  }

  return (
    <ScrollView horizontal={true}>
      {places.map((place, index) => {
        return (
          <PlaceCard
            navigation={navigation}
            place={place}
            key={index}
            userLocation={userLocation}
          />
        );
      })}
    </ScrollView>
  );
};

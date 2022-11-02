import { Text, ScrollView } from 'native-base';
import React, { FC } from 'react';

import { Place, UserLocation } from '../../../types/discover';

import { PlaceCard } from './PlaceCard';

type CarouselProps = {
  places: Place[];
  userLocation?: UserLocation;
};

export const PlacesCarousel: FC<CarouselProps> = ({ places, userLocation }) => {
  if (!places || places.length === 0) {
    return <Text>No places</Text>;
  }

  return (
    <ScrollView horizontal={true}>
      {places.map((place, index) => {
        return (
          <PlaceCard place={place} key={index} userLocation={userLocation} />
        );
      })}
    </ScrollView>
  );
};

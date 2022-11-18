import { useNavigation } from '@react-navigation/native';
import { ScrollView, Text } from 'native-base';
import React, { FC } from 'react';
import { Place, UserLocation } from '../../../types/discover';

import { PlaceCard } from './PlaceCard';
import { useFavorites } from '../hooks/useFavourite';
type PlacesCarouselProps = {
  places: Place[];
  userLocation?: UserLocation;
};

export const PlacesCarousel: FC<PlacesCarouselProps> = ({
  places,
  userLocation,
}) => {
  const { favorites, handleUpdateFavorites } = useFavorites();

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
            favorites={favorites}
            handleUpdateFavorites={handleUpdateFavorites}
          />
        );
      })}
    </ScrollView>
  );
};

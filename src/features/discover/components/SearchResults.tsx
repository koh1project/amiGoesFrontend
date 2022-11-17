import { Text, View } from 'native-base';
import React, { FC } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Place, UserLocation } from '../../../types/discover';
import { PlaceCard } from './PlaceCard';
import { StyleSheet } from 'react-native';

type SearchResultsProps = {
  places: Place[];
  userLocation?: UserLocation;
};

export const SearchResults: FC<SearchResultsProps> = ({
  places,
  userLocation,
}) => {
  const navigation = useNavigation();
  if (!places || places.length === 0) {
    return <Text>No places</Text>;
  }

  return (
    <View style={styles.container}>
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
  },
});

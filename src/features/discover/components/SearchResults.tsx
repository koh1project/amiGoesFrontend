import { useNavigation } from '@react-navigation/native';
import { Text, View } from 'native-base';
import React, { FC } from 'react';
import { StyleSheet } from 'react-native';
import i18n from '../../../localization/Localization';
import { Place, UserLocation } from '../../../types/discover';
import { PlaceCard } from './PlaceCard';

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
    return (
      <Text variant={'screenTitle'} style={styles.title}>
        {i18n.t('Discover.noResults')}
      </Text>
    );
  }

  return (
    <View>
      <Text variant={'screenTitle'} style={styles.title}>
        {i18n.t('Discover.results')}
      </Text>
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
  title: {
    marginBottom: 16,
    fontSize: 18,
    lineHeight: 24,
    marginLeft: 0,
    marginTop: 10,
  },
});

import { LocationObject } from 'expo-location';
import { Flex, Link, Text } from 'native-base';
import React, { FC } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import FilterIcon from '../../../../assets/icons/filter-icon.svg';
import i18n from '../../../localization/Localization';
import { GetDiscoverResponse } from '../../../types/discover';
import { PlacesCarousel } from './PlacesCarousel';

type DiscoverMainPlacesProps = {
  places: GetDiscoverResponse;
  location?: LocationObject;
  setIsFilterOpen: (value: boolean) => void;
};

export const DiscoverMainPlaces: FC<DiscoverMainPlacesProps> = ({
  places,
  location,
  setIsFilterOpen,
}) => (
  <>
    <Flex
      direction="row"
      justifyContent={'space-between'}
      alignItems={'center'}
    >
      <Text variant={'screenTitle'} style={styles.title}>
        {i18n.t('Discover.parks')}
      </Text>
      <TouchableOpacity
        style={styles.filterContainer}
        onPress={() => {
          setIsFilterOpen(true);
        }}
      >
        <FilterIcon marginRight={6} />
        <Link>{i18n.t('Discover.filter')}</Link>
      </TouchableOpacity>
    </Flex>
    <PlacesCarousel places={places['parks']} userLocation={location} />
    <Text variant={'screenTitle'} style={styles.title}>
      {i18n.t('Discover.restaurants')}
    </Text>

    <PlacesCarousel places={places['restaurants']} userLocation={location} />
    <Text variant={'screenTitle'} style={styles.title}>
      {i18n.t('Discover.entretainment')}
    </Text>
    <PlacesCarousel places={places['entertainment']} userLocation={location} />
    <Text variant={'screenTitle'} style={styles.title}>
      {i18n.t('Discover.sports')}
    </Text>
    <PlacesCarousel places={places['sports']} userLocation={location} />
  </>
);

const styles = StyleSheet.create({
  filterContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  title: {
    marginBottom: 16,
    fontSize: 18,
    lineHeight: 24,
    marginLeft: 0,
    marginTop: 10,
  },
});

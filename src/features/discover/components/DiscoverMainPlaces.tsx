import { LocationObject } from 'expo-location';
import { Flex, Text } from 'native-base';
import React, { FC } from 'react';
import { SecondaryHeading } from '../../../components/texts/Heading';
import { GetDiscoverResponse } from '../../../types/discover';
import { PlacesCarousel } from './PlacesCarousel';
import FilterIcon from '../../../../assets/icons/filter-icon.svg';
import { TouchableOpacity, StyleSheet } from 'react-native';

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
      <SecondaryHeading>Parks</SecondaryHeading>
      <TouchableOpacity
        style={styles.filterContainer}
        onPress={() => {
          setIsFilterOpen(true);
        }}
      >
        <FilterIcon />
        <Text color="coral">Filter</Text>
      </TouchableOpacity>
    </Flex>
    <PlacesCarousel places={places['parks']} userLocation={location} />
    <SecondaryHeading>Restaurants</SecondaryHeading>
    <PlacesCarousel places={places['restaurants']} userLocation={location} />
    <SecondaryHeading>Entertainment</SecondaryHeading>
    <PlacesCarousel places={places['entertainment']} userLocation={location} />
    <SecondaryHeading>Sports</SecondaryHeading>
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
});

import { LocationObject } from 'expo-location';
import React, { FC } from 'react';
import { SecondaryHeading } from '../../../components/texts/Heading';
import { GetDiscoverResponse } from '../../../types/discover';
import { PlacesCarousel } from './PlacesCarousel';

type DiscoverMainPlacesProps = {
  places: GetDiscoverResponse;
  location?: LocationObject;
};

export const DiscoverMainPlaces: FC<DiscoverMainPlacesProps> = ({
  places,
  location,
}) => (
  <>
    <SecondaryHeading>Parks</SecondaryHeading>
    <PlacesCarousel places={places['parks']} userLocation={location} />
    <SecondaryHeading>Restaurants</SecondaryHeading>
    <PlacesCarousel places={places['restaurants']} userLocation={location} />
    <SecondaryHeading>Entertainment</SecondaryHeading>
    <PlacesCarousel places={places['entertainment']} userLocation={location} />
    <SecondaryHeading>Sports</SecondaryHeading>
    <PlacesCarousel places={places['sports']} userLocation={location} />
  </>
);

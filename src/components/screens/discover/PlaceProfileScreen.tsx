import { Place } from '@googlemaps/google-maps-services-js';
import { Text, Image, ScrollView, AspectRatio } from 'native-base';
import React, { FC, useCallback, useEffect, useState } from 'react';
import { getPlaceById } from '../../../services/discover.service';
import { GOOGLE_MAPS_API_KEY } from '../../../utils/const';

export const PlaceProfileScreen: React.FC<any> = ({ route }) => {
  const { place_id } = route.params;
  console.log('place_id: ', place_id);

  const [place, setPlace] = useState<Place>();

  useEffect(() => {
    const fetchPlace = async () => {
      const response = await getPlaceById(place_id);
      setPlace(response.data);
    };
    fetchPlace();
  }, []);

  return (
    <ScrollView>
      {place && (
        <>
          <AspectRatio w="100%" ratio={16 / 9}>
            <Image
              source={{
                uri: `https://maps.googleapis.com/maps/api/place/photo?photo_reference=${
                  place.photos[0].photo_reference
                }&maxwidth=${400}&maxheight=${300}&key=${GOOGLE_MAPS_API_KEY}`,
              }}
              alt="image"
            />
          </AspectRatio>
          <Text>{`Place Profile Page - id:  ${place_id}`}</Text>
        </>
      )}
    </ScrollView>
  );
};

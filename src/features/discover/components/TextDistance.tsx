import { getDistance } from 'geolib';
import { FC, useCallback } from 'react';
import { Place } from 'react-native-google-places-autocomplete';
import { UserLocation } from '../../../types/discover';
import { Text } from 'native-base';

export const TextDistance: FC<{
  place: Partial<Place>;
  userLocation: UserLocation;
}> = ({ place, userLocation }) => {
  if (!userLocation || !place.geometry || !place.geometry.location) {
    return <></>;
  }

  const formatDistance = useCallback((distance: number) => {
    try {
      return distance > 1000
        ? (distance / 1000).toFixed(1) + 'km'
        : distance + 'm';
    } catch (error) {
      console.error(error);
      return '';
    }
  }, []);
  const calculateDistance = useCallback<
    (placeLatitude: number, placeLongitude: number) => number
  >((placeLatitude, placeLongitude) => {
    if (
      !userLocation ||
      !userLocation.coords ||
      !userLocation.coords.latitude ||
      !userLocation.coords.longitude
    ) {
      return 0;
    }

    try {
      return getDistance(
        {
          latitude: placeLatitude,
          longitude: placeLongitude,
        },
        {
          latitude: userLocation?.coords.latitude,
          longitude: userLocation?.coords.longitude,
        },
      );
    } catch (error) {
      console.error(error);
      return 0;
    }
  }, []);

  try {
    return (
      <Text
        fontSize="xs"
        _light={{
          color: 'violet.500',
        }}
        _dark={{
          color: 'violet.400',
        }}
        fontWeight="500"
        ml="-0.5"
        mt="-1"
      >
        {formatDistance(
          calculateDistance(
            place.geometry.location.lat,
            place.geometry.location.lng,
          ),
        )}
      </Text>
    );
  } catch (error) {
    return <></>;
  }
};

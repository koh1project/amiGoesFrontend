import {
  AspectRatio,
  Box,
  Heading,
  HStack,
  Image,
  Stack,
  Text,
  View,
} from 'native-base';
import React, { FC, useCallback } from 'react';

import { Place, UserLocation } from '../../../types/discover';

import { getDistance } from 'geolib';

type CarouselProps = {
  places: Place[];
  userLocation?: UserLocation;
};

export const PlacesCarousel: React.FC<CarouselProps> = ({
  places,
  userLocation,
}) => {
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

  if (!places || places.length === 0) {
    return <Text>No places</Text>;
  }
  const renderItem = ({ item, index }) => {
    return (
      <View>
        <Text>{'items'}</Text>
      </View>
    );
  };

  const TextDistance: FC<{ place: Place }> = ({ place }) => {
    if (!userLocation || !place.geometry || !place.geometry.location) {
      return <></>;
    }
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
      console.log('error: ', error);
      return <> </>;
    }
  };

  return (
    // <Carousel
    //   useScrollView={true}
    //   data={data}
    //   renderItem={renderItem}
    //   sliderWidth={300}
    //   itemWidth={200}
    // />
    <>
      {places.map((place, index) => {
        return (
          <Box alignItems="center" key={index}>
            <Box
              maxW="80"
              rounded="lg"
              overflow="hidden"
              borderColor="coolGray.200"
              borderWidth="1"
              _dark={{
                borderColor: 'coolGray.600',
                backgroundColor: 'gray.700',
              }}
              _web={{
                shadow: 2,
                borderWidth: 0,
              }}
              _light={{
                backgroundColor: 'gray.50',
              }}
            >
              <Box>
                <AspectRatio w="100%" ratio={16 / 9}>
                  {/* <PlaceImage
                    photoreference={place.photos[0].photo_reference}
                  /> */}
                  <Image
                    source={{
                      uri: 'https://www.holidify.com/images/cmsuploads/compressed/Bangalore_citycover_20190613234056.jpg',
                    }}
                    alt="image"
                  />
                </AspectRatio>
              </Box>
              <Stack p="4" space={3}>
                <Stack space={2}>
                  <Heading size="md" ml="-1">
                    {place.name}
                  </Heading>
                  <TextDistance place={place} />
                </Stack>
                <HStack
                  alignItems="center"
                  space={4}
                  justifyContent="space-between"
                >
                  <HStack alignItems="center">
                    <Text
                      color="coolGray.600"
                      _dark={{
                        color: 'warmGray.200',
                      }}
                      fontWeight="400"
                    >
                      Open 24 hours
                    </Text>
                  </HStack>
                </HStack>
              </Stack>
            </Box>
          </Box>
        );
      })}
    </>
  );
};

import {
  AspectRatio,
  Box,
  Heading,
  HStack,
  Image,
  Stack,
  Text,
  Flex,
  View,
} from 'native-base';
import React, { FC } from 'react';
import { Place, UserLocation } from '../../../types/discover';
import {
  StyleProp,
  TouchableOpacity,
  ViewStyle,
  StyleSheet,
} from 'react-native';

import { GOOGLE_MAPS_API_KEY, SCREEN_NAMES } from '../../../utils/const';
import { TextDistance } from './TextDistance';
import { NavigationProp } from '@react-navigation/native';
import HeartIcon from '../../../../assets/icons/heart-icon.svg';
import MapMarkerIcon from '../../../../assets/icons/map-marker-icon.svg';

type PlaceCardProps = {
  place: Place;
  userLocation?: UserLocation;
  navigation: NavigationProp<any>;
  containerStyle?: StyleProp<ViewStyle>;
};

export const PlaceCard: FC<PlaceCardProps> = ({
  place,
  userLocation,
  navigation,
  containerStyle,
}) => {
  let photo_reference;
  if (place.photos) {
    photo_reference = place.photos[0].photo_reference;
  }

  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate(
          SCREEN_NAMES.PlaceProfile as never,
          {
            place_id: place.place_id,
          } as never,
        );
      }}
      style={containerStyle}
    >
      <Box alignItems="center">
        <Box
          maxW="80"
          w="95%"
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
          minH="280"
          marginBottom={5}
        >
          {photo_reference && (
            <Box>
              <AspectRatio w="100%" ratio={16 / 9}>
                <Image
                  source={{
                    uri: `https://maps.googleapis.com/maps/api/place/photo?photo_reference=${photo_reference}&maxwidth=${400}&maxheight=${300}&key=${GOOGLE_MAPS_API_KEY}`,
                  }}
                  alt="image"
                />
              </AspectRatio>
              <TouchableOpacity style={styles.favIcon}>
                <HeartIcon />
              </TouchableOpacity>
            </Box>
          )}
          <Stack p="4" space={3}>
            <Stack space={2}>
              <Heading size="md" ml="-1">
                {place.name}
              </Heading>
              <View style={styles.distanceContainer}>
                <MapMarkerIcon />
                <TextDistance place={place} userLocation={userLocation} />
              </View>
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
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  favIcon: {
    position: 'absolute',
    top: 15,
    right: 15,
    zIndex: 10,
    padding: 3,
  },

  distanceContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
});

import {
  AspectRatio,
  Box,
  HStack,
  Image,
  Stack,
  Text,
  View,
} from 'native-base';
import React, { FC } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Place, UserLocation } from '../../../types/discover';

import { NavigationProp } from '@react-navigation/native';
import HeartIcon from '../../../../assets/icons/heart-icon.svg';
import HeartWhiteIcon from '../../../../assets/icons/heart-white-icon.svg';
import MapMarkerIcon from '../../../../assets/icons/map-marker-icon.svg';
import RightIcon from '../../../../assets/icons/right.svg';
import ShareIcon from '../../../../assets/icons/share.svg';
import { GOOGLE_MAPS_API_KEY, SCREEN_NAMES } from '../../../utils/const';
import { TextDistance } from './TextDistance';
import { useFavorites } from '../hooks/useFavourite';

type PlaceCardProps = {
  place: Place;
  userLocation?: UserLocation;
  navigation: NavigationProp<any>;
};

export const PlaceCard: FC<PlaceCardProps> = ({
  place,
  userLocation,
  navigation,
}) => {
  let photo_reference;
  if (place.photos) {
    photo_reference = place.photos[0].photo_reference;
  }
  const { place_id } = place;

  const { favorites, handleUpdateFavorites } = useFavorites();

  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate(
          SCREEN_NAMES.PlaceProfile as never,
          {
            place_id,
          } as never,
        );
      }}
      style={{
        flexBasis: '40%',
        flexGrow: 1,
        flexShrink: 1,
        marginRight: 14,
      }}
    >
      <Box alignItems="center">
        <Box
          maxW="80"
          rounded="lg"
          overflow="hidden"
          borderColor="coolGray.200"
          borderWidth="1"
          _dark={{
            borderColor: 'green',
            backgroundColor: '#F8F8F8',
          }}
          _web={{
            shadow: 2,
            borderWidth: 0,
          }}
          _light={{
            backgroundColor: '#F8F8F8',
            borderColor: 'green',
          }}
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
              <TouchableOpacity
                style={styles.favIcon}
                onPress={() => {
                  handleUpdateFavorites(place_id);
                }}
              >
                {favorites.includes(place_id) ? (
                  <HeartWhiteIcon />
                ) : (
                  <HeartIcon />
                )}
              </TouchableOpacity>
            </Box>
          )}
          <Stack p="4" space={3}>
            <HStack
              style={{
                justifyContent: 'space-between',
              }}
            >
              <Text>{place.name}</Text>
              <RightIcon />
            </HStack>
            <View style={styles.distanceContainer}>
              <MapMarkerIcon marginRight={6} />
              <TextDistance place={place} userLocation={userLocation} />
            </View>

            <HStack
              alignItems="center"
              space={4}
              justifyContent="space-between"
            >
              <HStack
                style={{
                  justifyContent: 'space-between',
                  width: '100%',
                }}
              >
                <Text variant={'disclaimer'}>Open 24 hours</Text>
                <ShareIcon />
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

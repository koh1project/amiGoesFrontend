import {
  Image,
  ScrollView,
  AspectRatio,
  Flex,
  Text,
  Button,
  CircleIcon,
  HStack,
  View,
} from 'native-base';
import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SecondaryHeading, TertiaryHeading } from '../../texts/Heading';
import { usePlaceProfile } from '../../../features/discover/hooks/usePlaceProfile';
import { TextDistance } from '../../../features/discover/components/TextDistance';
import { PlaceProfileMap } from '../../../features/discover/components/PlaceProfileMap';
import { SCREEN_NAMES } from '../../../utils/const';
import { ThemeColors } from '../../../theme';
import GoNowIcon from '../../../../assets/icons/go-now-icon.svg';
import HeartIcon from '../../../../assets/icons/heart-icon.svg';

type PlaceProfileScreenProps = {
  route: {
    params: {
      place_id: string;
    };
  };
};

export const PlaceProfileScreen: React.FC<PlaceProfileScreenProps> = ({
  route,
}) => {
  let place_id = route?.params?.place_id;
  const navigation = useNavigation();

  //@NOTE: development purpose, Stanley Park
  if (!place_id) {
    place_id = 'ChIJo-QmrYxxhlQRFuIJtJ1jSjY';
  }

  const { place, photoUrls, photoIndex, handleNextPhoto, userLocation } =
    usePlaceProfile(place_id);

  if (!place) {
    return <></>;
  }

  return (
    <ScrollView>
      <TouchableOpacity onPress={handleNextPhoto}>
        <AspectRatio w="100%" ratio={16 / 9}>
          <Image
            source={{
              uri: photoUrls[photoIndex],
            }}
            alt="image"
          />
        </AspectRatio>
        <HStack style={styles.dotContainer}>
          {photoUrls.map((url, index) => (
            <View style={styles.dot}>
              <CircleIcon
                key={index}
                size={2}
                color={
                  index === photoIndex
                    ? ThemeColors.green
                    : ThemeColors.lightgreen
                }
              />
            </View>
          ))}
        </HStack>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate(SCREEN_NAMES.GoNow as never);
          }}
          style={styles.buttonContainer}
        >
          <GoNowIcon />
          <Text style={styles.buttonLabel}>GO NOW</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.favIcon}>
          <HeartIcon />
        </TouchableOpacity>
      </TouchableOpacity>

      <Flex>
        <SecondaryHeading>{place.name}</SecondaryHeading>
      </Flex>
      <Flex>
        <TextDistance place={place} userLocation={userLocation} />
        <Text>Open 24 hours</Text>
      </Flex>
      <TertiaryHeading>Avg Price</TertiaryHeading>
      <Text>Free</Text>
      <Text>{place?.editorial_summary?.overview}</Text>
      <PlaceProfileMap geometry={place.geometry} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  dotContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  dot: {
    margin: 2,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: ThemeColors.lightcoral,
    padding: 10,
    borderRadius: 100,
    borderColor: ThemeColors.coral,
    borderWidth: 1,
  },
  buttonLabel: {
    color: ThemeColors.coral,
    textDecorationLine: 'underline',
  },
  favIcon: {
    position: 'absolute',
    top: 15,
    right: 15,
    zIndex: 10,
    padding: 3,
  },
});

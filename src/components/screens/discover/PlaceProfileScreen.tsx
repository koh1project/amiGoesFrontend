import {
  Image,
  ScrollView,
  AspectRatio,
  Flex,
  Text,
  Alert,
  VStack,
  HStack,
  CloseIcon,
  Box,
  IconButton,
  CircleIcon,
  View,
} from 'native-base';
import React, { useState, FC, useEffect } from 'react';
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
import HeartWhiteIcon from '../../../../assets/icons/heart-white-icon.svg';
import { useFavorites } from '../../../features/discover/hooks/useFavourite';

type PlaceProfileScreenProps = {
  route: {
    params: {
      place_id: string;
    };
  };
};

export const PlaceProfileScreen: FC<PlaceProfileScreenProps> = ({ route }) => {
  let place_id = route?.params?.place_id;
  const navigation = useNavigation();

  const [backedFromGoNow, setBackedFromGoNow] = useState(false);
  const { favorites, handleUpdateFavorites } = useFavorites();

  const goBackDetection = () => {
    setBackedFromGoNow(true);
  };

  useEffect(() => {
    if (backedFromGoNow) {
      setTimeout(() => {
        setBackedFromGoNow(false);
      }, 4000);
    }
  }, [backedFromGoNow]);

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
      {backedFromGoNow && (
        <Alert maxW="400" status="info" colorScheme="info">
          <VStack space={2} flexShrink={1} w="100%">
            <HStack
              flexShrink={1}
              space={2}
              alignItems="center"
              justifyContent="space-between"
            >
              <HStack flexShrink={1} space={2} alignItems="center">
                <Alert.Icon />
                <Text fontSize="md" fontWeight="medium" color="coolGray.800">
                  Your location is being shared for the next 20 minutes.
                </Text>
              </HStack>
              <IconButton
                variant="unstyled"
                _focus={{
                  borderWidth: 0,
                }}
                icon={<CloseIcon size="3" />}
                _icon={{
                  color: 'coolGray.600',
                }}
              />
            </HStack>
            <Box
              pl="6"
              _text={{
                color: '#EE6653',
              }}
            >
              STOP
            </Box>
          </VStack>
        </Alert>
      )}
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
            <View style={styles.dot} key={index}>
              <CircleIcon
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
            navigation.navigate(
              SCREEN_NAMES.GoNow as never,
              {
                goBackDetection: goBackDetection,
              } as never,
            );
          }}
          style={styles.buttonContainer}
        >
          <GoNowIcon />
          <Text style={styles.buttonLabel}>GO NOW</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.favIcon}
          onPress={() => {
            handleUpdateFavorites(place_id);
          }}
        >
          {favorites.includes(place_id) ? <HeartWhiteIcon /> : <HeartIcon />}
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

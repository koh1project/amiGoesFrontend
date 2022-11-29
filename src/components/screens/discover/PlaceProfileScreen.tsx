import { useNavigation } from '@react-navigation/native';
import {
  Alert,
  CircleIcon,
  CloseIcon,
  Flex,
  HStack,
  IconButton,
  Image,
  Link,
  ScrollView,
  Text,
  View,
  VStack,
} from 'native-base';
import React, { FC, useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import GoNowIcon from '../../../../assets/icons/go-now-icon.svg';
import HeartIcon from '../../../../assets/icons/heart-icon.svg';
import HeartWhiteIcon from '../../../../assets/icons/heart-white-icon.svg';
import Info from '../../../../assets/icons/info.svg';
import MapMarkerIcon from '../../../../assets/icons/map-marker-icon.svg';
import { PlaceProfileMap } from '../../../features/discover/components/PlaceProfileMap';
import { TextDistance } from '../../../features/discover/components/TextDistance';
import { useFavorites } from '../../../features/discover/hooks/useFavourite';
import { usePlaceProfile } from '../../../features/discover/hooks/usePlaceProfile';
import { ThemeColors } from '../../../theme';
import { SCREEN_NAMES } from '../../../utils/const';

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
    <ScrollView backgroundColor={'white'}>
      {backedFromGoNow && (
        <Alert maxW="400" status="info" backgroundColor={'lightcoral'}>
          <VStack space={2} flexShrink={1} w="100%">
            <HStack
              flexShrink={1}
              space={2}
              alignItems="center"
              justifyContent="space-between"
            >
              <HStack flexShrink={1} space={2} alignItems="center">
                <Info />
                <Text variant={'disclaimer'}>
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
            <Link marginLeft={6}>STOP</Link>
          </VStack>
        </Alert>
      )}
      <View marginLeft={'20px'} marginRight={'20px'}>
        <TouchableOpacity onPress={handleNextPhoto}>
          {/* <AspectRatio w="100%" ratio={16 / 9} h={308}> */}

          <Image
            source={{
              uri: photoUrls[photoIndex],
            }}
            alt="image"
            resizeMode="cover"
            style={styles.image}
            width="100%"
            height={308}
          />

          {/* </AspectRatio> */}

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
            <GoNowIcon marginRight={4} />
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
      </View>
      <VStack marginRight={'20px'} marginLeft={'20px'} marginBottom={'30px'}>
        <Flex>
          <Text variant={'h2'} color={'green'} marginTop={19}>
            {place.name}
          </Text>
        </Flex>
        <Flex>
          <HStack
            style={{
              marginTop: 10,
              alignContent: 'center',
            }}
          >
            <MapMarkerIcon marginRight={6} />
            <TextDistance place={place} userLocation={userLocation} />
          </HStack>
          <Text>Open 24 hours</Text>
        </Flex>
        <Text marginTop={19} variant={'onboardingTitle'} color={'green'}>
          {' '}
          Avg Price
        </Text>
        <Text>Free</Text>
        <Text marginTop={12}>{place?.editorial_summary?.overview}</Text>
        <PlaceProfileMap geometry={place.geometry} />
      </VStack>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  dotContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 10,
    left: 0,
    right: 0,
  },
  dot: {
    margin: 2,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 50,
    right: 19,
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
    right: 19,
    zIndex: 10,
    padding: 3,
  },
  image: {
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
  },
});

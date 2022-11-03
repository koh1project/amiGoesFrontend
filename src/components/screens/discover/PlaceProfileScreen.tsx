import { Image, ScrollView, AspectRatio, Flex, Text } from 'native-base';
import React from 'react';
import { TouchableOpacity } from 'react-native';
import { SecondaryHeading, TertiaryHeading } from '../../texts/Heading';
import { usePlaceProfile } from '../../../features/discover/hooks/usePlaceProfile';
import { TextDistance } from '../../../features/discover/components/TextDistance';
import { PlaceProfileMap } from '../../../features/discover/components/PlaceProfileMap';

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
  let { place_id } = route.params;

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

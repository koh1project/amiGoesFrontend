import { Image } from 'native-base';
import { FC } from 'react';
import { GOOGLE_MAPS_API_KEY } from '../../../const';

export const PlaceImage: FC<{ photoreference: string }> = ({
  photoreference,
}) => {
  const uri = `https://maps.googleapis.com/maps/api/place/photo?photo_reference=${photoreference}&maxwidth=${400}&maxheight=${300}&key=${GOOGLE_MAPS_API_KEY}`;
  // console.log('uri: ', uri);

  return (
    <Image
      source={{
        uri,
      }}
      alt="PlacePhoto"
    />
  );
};

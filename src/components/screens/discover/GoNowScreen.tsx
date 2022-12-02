import { Button, Flex, Slider, Text, View } from 'native-base';
import React, { FC, useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { GoNowMap } from '../../../features/discover/components/GoNowMap';
import { useGoNow } from '../../../features/discover/hooks/useGoNow';
import { getAmigosFromLocation } from '../../../services/userProfile.service';
import { GoNowUserLocationMarker } from '../../../types/discover';
import { useAuthContext } from '../../auth/AuthContextProvider';
const defaultPhoto = '../../../../assets/amigoes/person.png';

export const GoNowScreen: FC<any> = (props) => {
  const { route } = props;
  const { user } = useAuthContext();
  const { circleRadius, setCircleRadius, handleOnPress, userLocation } =
    useGoNow(route);

  const [markers, setMarkers] = useState<GoNowUserLocationMarker[]>([]);
  useEffect(() => {
    loadAmigoes();
  }, [user, userLocation]);

  const loadAmigoes = async () => {
    const response = await getAmigosFromLocation(
      { location: userLocation, distance: circleRadius },
      user.uid,
    );
    if (response && response.data) {
      const data = response.data?.map((amigo) => {
        return {
          ...amigo,
          coordinate: {
            latitude: parseFloat(
              amigo?.connectPreferences?.currentLocation?.latitude || '0',
            ),
            longitude: parseFloat(
              amigo?.connectPreferences?.currentLocation?.longitude || '0',
            ),
          },
          photoUrl: amigo.profilePictureLink || defaultPhoto,
        };
      });
      console.log(data);
      setMarkers(data);
    }
  };

  return (
    <>
      <GoNowMap circleRadius={circleRadius} userMarkers={markers} />

      <View backgroundColor={'white'} paddingX={20} style={styles.container}>
        <Flex
          flexDirection={'row'}
          justifyContent="space-between"
          marginTop={21}
        >
          <Text>Distance</Text>
          <Text>{`${circleRadius}km`}</Text>
        </Flex>
        <View marginTop={10}>
          <Slider
            w="100%"
            defaultValue={5}
            minValue={0}
            accessibilityLabel="Distance"
            maxValue={10}
            step={1}
            onChange={(value) => setCircleRadius(value)}
          >
            <Slider.Track>
              <Slider.FilledTrack />
            </Slider.Track>
            <Slider.Thumb />
          </Slider>
        </View>
        <Button
          variant={'primaryLarge'}
          style={styles.button}
          onPress={handleOnPress}
        >
          SHARE LIVE LOCATION
        </Button>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  button: {
    marginBottom: 20,
    marginTop: 28,
    alignSelf: 'center',
  },
  container: {
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
});

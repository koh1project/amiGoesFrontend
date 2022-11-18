import { Button, Flex, Slider, Text, View } from 'native-base';
import React, { FC } from 'react';
import { StyleSheet } from 'react-native';
import { GoNowMap } from '../../../features/discover/components/GoNowMap';
import { useGoNow } from '../../../features/discover/hooks/useGoNow';

export const GoNowScreen: FC<any> = (props) => {
  const { route } = props;
  const { circleRadius, setCircleRadius, handleOnPress } = useGoNow(route);

  return (
    <>
      <GoNowMap circleRadius={circleRadius} />

      <View
        backgroundColor={'white'}
        paddingHorizontal={20}
        style={styles.container}
      >
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

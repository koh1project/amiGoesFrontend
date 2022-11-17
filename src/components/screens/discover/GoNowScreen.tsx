import { View, Text, Flex, Button, Slider } from 'native-base';
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

      <Flex flexDirection={'row'} justifyContent="space-between">
        <Text>Distance</Text>
        <Text>{`${circleRadius}km`}</Text>
      </Flex>
      <View>
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
      <Button style={styles.button} onPress={handleOnPress}>
        SHARE LIVE LOCATION
      </Button>
    </>
  );
};

const styles = StyleSheet.create({
  button: {
    width: '100%',
    marginBottom: 150,
    backgroundColor: '#EE6653',
  },
});

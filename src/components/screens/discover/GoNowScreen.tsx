import { View, Text, Flex, Button, Slider } from 'native-base';
import { FC } from 'react';
import { StyleSheet } from 'react-native';
import { GoNowMap } from '../../../features/discover/components/GoNowMap';

export const GoNowScreen: FC = () => {
  return (
    <>
      <GoNowMap />
      <View>
        <Flex>
          <Text>Distance</Text>
          <Text>3km</Text>
        </Flex>
        <View>
          <Slider
            w="100%"
            defaultValue={70}
            minValue={0}
            accessibilityLabel="Distance"
            step={10}
          >
            <Slider.Track>
              <Slider.FilledTrack />
            </Slider.Track>
            <Slider.Thumb />
          </Slider>
        </View>
        <Button style={styles.button}>SHARE LIVE LOCATION</Button>
      </View>
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

const mockData = {};

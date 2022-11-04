import {
  View,
  Text,
  Flex,
  Button,
  Slider,
  Alert,
  VStack,
  HStack,
  CloseIcon,
  Box,
  IconButton,
} from 'native-base';
import React, { FC } from 'react';
import { StyleSheet } from 'react-native';
import { GoNowMap } from '../../../features/discover/components/GoNowMap';
import { useGoNow } from '../../../features/discover/hooks/useGoNow';

export const GoNowScreen: FC = () => {
  const { circleRadius, setCircleRadius, handleOnPress, clicked } = useGoNow();

  return (
    <>
      {clicked && (
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

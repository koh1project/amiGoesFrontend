import { useUserLocation } from './useUserLocation';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
export const useGoNow = (route = null) => {
  const { location } = useUserLocation();
  const [circleRadius, setCircleRadius] = useState(5);
  const navigation = useNavigation();

  const handleOnPress = () => {
    if (route) {
      const { goBackDetection } = route.params;
      goBackDetection();
    }

    navigation.goBack();
  };

  return {
    circleRadius,
    setCircleRadius,
    handleOnPress,
    userLocation: location,
  };
};

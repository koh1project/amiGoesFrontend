import { useUserLocation } from './useUserLocation';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
export const useGoNow = () => {
  const { location } = useUserLocation();
  const [circleRadius, setCircleRadius] = useState(5);
  const [clicked, setClicked] = useState(false);
  const navigation = useNavigation();

  const handleOnPress = () => {
    setClicked(true);

    setTimeout(() => {
      navigation.goBack();
    }, 3000);
  };

  return {
    circleRadius,
    setCircleRadius,
    handleOnPress,
    clicked,
    userLocation: location,
  };
};

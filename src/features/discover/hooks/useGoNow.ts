import { useUserLocation } from './useUserLocation';

export const useGoNow = () => {
  const { location } = useUserLocation();
  return { userLocation: location };
};

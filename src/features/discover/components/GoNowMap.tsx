import { FC, useRef } from 'react';
import MapView, { Marker, Region } from 'react-native-maps';

import { View } from 'native-base';
import { StyleSheet, Dimensions } from 'react-native';
import { useGoNow } from '../hooks/useGoNow';

type GoNowMapProps = any;

export const GoNowMap: FC<GoNowMapProps> = () => {
  const { userLocation } = useGoNow();
  const mapRef = useRef<MapView>(null);
  const { width, height } = Dimensions.get('window');
  const ASPECT_RATIO = width / height;
  const LATITUDE_DELTA = 0.01;
  const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

  if (!userLocation) {
    return <></>;
  }

  const handleRegionChange = async (region: Region) => {
    console.log(region);
    const mapBoundaries = await mapRef.current.getMapBoundaries();
    console.log(mapBoundaries);
  };

  const { latitude, longitude } = userLocation.coords;

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude,
          longitude,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA,
        }}
        ref={mapRef}
        showsUserLocation={true}
        // followsUserLocation={true}
        onRegionChangeComplete={handleRegionChange}
      >
        <Marker
          coordinate={{
            latitude,
            longitude,
          }}
        />
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    // justifyContent: 'center',
    borderRadius: 10,
    width: '90%',
  },
  map: {
    width: Dimensions.get('window').width,
    height: (Dimensions.get('window').height * 2) / 3,
  },
});

/**
 *  @document {https://github.com/react-native-maps/react-native-maps}
 */

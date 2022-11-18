import { FC } from 'react';
import MapView, { Marker } from 'react-native-maps';

import { View } from 'native-base';
import { Dimensions, StyleSheet } from 'react-native';
import { PlaceDetail, Viewport } from '../../../types/discover';

type PlaceProfileMapProps = {
  geometry: PlaceDetail['geometry'];
};

export const PlaceProfileMap: FC<PlaceProfileMapProps> = ({ geometry }) => {
  const { viewport, location } = geometry;
  type Region = {
    latitude: number;
    longitude: number;
    latitudeDelta: number;
    longitudeDelta: number;
  };

  const calcRegion = (viewport: Viewport): Region => {
    const { northeast, southwest } = viewport;
    const latitudeDelta = northeast.lat - southwest.lat;
    const longitudeDelta = northeast.lng - southwest.lng;
    const latitude = (northeast.lat + southwest.lat) / 2;
    const longitude = (northeast.lng + southwest.lng) / 2;
    return {
      latitude,
      longitude,
      latitudeDelta,
      longitudeDelta,
    };
  };

  return (
    <View style={styles.container}>
      <MapView style={styles.map} initialRegion={calcRegion(viewport)}>
        <Marker
          coordinate={{
            latitude: location.lat,
            longitude: location.lng,
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
    justifyContent: 'center',
    borderRadius: 25,
    width: '100%',
  },
  map: {
    width: Dimensions.get('window').width * 0.9,
    height: (Dimensions.get('window').height * 2) / 5,
  },
});

/**
 *  @document {https://github.com/react-native-maps/react-native-maps}
 */

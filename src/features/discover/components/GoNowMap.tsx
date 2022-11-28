import { FC, useEffect, useRef, useState } from 'react';
import MapView, { Circle, Marker, Region } from 'react-native-maps';

import { Text, View } from 'native-base';
import { Dimensions, StyleSheet } from 'react-native';
import Person from '../../../../assets/amigoes/person.svg';
import { GoNowUserLocationMarker } from '../../../types/discover';
import { useGoNow } from '../hooks/useGoNow';

type GoNowMapProps = {
  circleRadius: number;
  userMarkers: GoNowUserLocationMarker[] | undefined;
};

export const GoNowMap: FC<GoNowMapProps> = ({ circleRadius, userMarkers }) => {
  const { userLocation } = useGoNow();
  const mapRef = useRef<MapView>(null);
  const [markers, setMarkers] = useState<GoNowUserLocationMarker[]>([]);
  const { width, height } = Dimensions.get('window');
  const ASPECT_RATIO = width / height;
  const LATITUDE_DELTA = 0.01;
  const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

  const handleRegionChange = async (region: Region) => {
    const mapBoundaries = await mapRef.current.getMapBoundaries();
  };

  useEffect(() => {
    if (userMarkers?.length) {
      setMarkers(userMarkers);
    }
  }, [userMarkers]);

  return (
    <View style={styles.container}>
      {userLocation && (
        <MapView
          showsScale={true}
          style={styles.map}
          region={{
            latitude: userLocation?.coords.latitude,
            longitude: userLocation?.coords.longitude,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
          }}
          ref={mapRef}
          showsUserLocation={true}
          onRegionChangeComplete={handleRegionChange}
        >
          <Circle
            center={{
              latitude: userLocation.coords.latitude,
              longitude: userLocation.coords.longitude,
            }}
            radius={111 * circleRadius}
            fillColor="rgba(0, 0, 0, 0.1)"
            strokeColor="rgba(0, 0, 0, 0.1)"
          />
          <Marker
            coordinate={{
              latitude: userLocation?.coords.latitude,
              longitude: userLocation?.coords.longitude,
            }}
            title="Your location"
          />
          {markers.map((amigoes, index) => {
            return (
              <Marker
                key={amigoes.name}
                coordinate={{
                  latitude: amigoes.coordinate.latitude || 0,
                  longitude: amigoes.coordinate.longitude || 0,
                }}
                title={amigoes.name}
                description={amigoes.name}
              >
                <Person />
                <Text
                  style={{
                    backgroundColor: '#FFFFFF',
                    textAlign: 'center',
                    borderRadius: 20,
                  }}
                >
                  {amigoes.name}
                </Text>
              </Marker>
            );
          })}
        </MapView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    width: '100%',
    paddingTop: 26,
    backgroundColor: '#FFFFFF',
  },
  map: {
    width: Dimensions.get('window').width,
    height: (Dimensions.get('window').height * 2) / 3,
  },
});

/**
 *  @document {https://github.com/react-native-maps/react-native-maps}
 */

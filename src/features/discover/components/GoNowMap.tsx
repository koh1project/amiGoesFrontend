import { FC, useRef } from 'react';
import MapView, { Circle, Marker, Region } from 'react-native-maps';

import { Image, Text, View } from 'native-base';
import { Dimensions, StyleSheet } from 'react-native';
import { useGoNow } from '../hooks/useGoNow';

type GoNowMapProps = {
  circleRadius: number;
};

export const GoNowMap: FC<GoNowMapProps> = ({ circleRadius }) => {
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
    const mapBoundaries = await mapRef.current.getMapBoundaries();
  };

  const { latitude, longitude } = userLocation.coords;

  const mockData = [
    {
      name: 'Mary',
      photoUrl: '../../../../assets/amigoes/marry.png',
      coordinate: {
        latitude: latitude + 0.001,
        longitude: longitude + 0.001,
      },
    },
    {
      name: 'Sara',
      photoUrl: '../../../../assets/amigoes/marry.png',
      coordinate: {
        latitude: latitude - 0.001,
        longitude: longitude - 0.001,
      },
    },
  ];

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
        onRegionChangeComplete={handleRegionChange}
      >
        <Circle
          center={{ latitude, longitude }}
          radius={circleRadius * 30}
          fillColor="rgba(0, 0, 0, 0.1)"
          strokeColor="rgba(0, 0, 0, 0.1)"
        />
        <Marker
          coordinate={{
            latitude,
            longitude,
          }}
        />
        {mockData.map((amigoes, index) => (
          <Marker
            key={index}
            coordinate={amigoes.coordinate}
            title={amigoes.name}
            description={amigoes.name}
          >
            <Image
              source={require('../../../../assets/amigoes/marry.png')}
              style={{ width: 50, height: 50 }}
              resizeMethod={'resize'}
            />
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
        ))}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
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

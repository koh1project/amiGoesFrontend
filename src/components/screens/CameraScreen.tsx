import { Camera, CameraType } from 'expo-camera';
import { useRef, useState } from 'react';
import {
  Button,
  StyleSheet,
  Text,
  useWindowDimensions,
  View
} from 'react-native';

const CameraScreen = (navigation, route) => {
  const cameraRef = useRef();
  const { height, width } = useWindowDimensions();
  const screenRatio = height / width;
  const [type, setType] = useState(CameraType.back);

  const [cameraPermission, requestCameraPermission] =
    Camera.useCameraPermissions();
  // const [mediaLibraryPermission, requestMediaLibraryPermission] =
  //   MediaLibrary.usePermissions();

  if (!cameraPermission) {
    requestCameraPermission();
  }
  // if (!cameraPermission.granted) {
  //   return <Text>No access to camera</Text>;
  // }

  const takePhoto = async () => {
    if (cameraRef) {
      const data = await cameraRef.current.takePictureAsync();
      console.log(data);
    }
  };

  return (
    <Camera style={styles.container} ref={cameraRef}>
      <View style={styles.target}>
        <Text style={styles.text}>Aim at text</Text>
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Take Photo" onPress={takePhoto} />
      </View>
    </Camera>
  );
};

export default CameraScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    // justifyContent: 'center',
    // justifyContent: 'flex-end',
    // justifyContent: 'center',
  },
  buttonContainer: {
    marginBottom: 0,
    justifySelf: 'flex-end',
  },
  preview: {
    alignSelf: 'stretch',
    flex: 1,
  },
  target: {
    width: 200,
    height: 200,
    // backgroundColor: 'transparent',

    marginBottom: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    boxShadow:
      '-80px -80px 0 -70px white, 80px -80px 0 -70px white, -80px 80px 0 -70px white, 80px 80px 0 -70px white',
  },
  text: {
    color: 'white',
    fontSize: 20,
  },
});

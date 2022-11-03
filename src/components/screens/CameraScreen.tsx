import { Camera, CameraType } from 'expo-camera';
import { Button } from 'native-base';
import { useEffect, useRef, useState } from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import FlipCameraIcon from '../../../assets/icons/switch-camera.svg';
import { postTranslate } from '../../services/translate.service';
import { SCREEN_NAMES } from '../../utils/const';

const CameraScreen = (props) => {
  const { navigation, route } = props;
  const cameraRef = useRef();
  const [cameraPermission, requestCameraPermission] =
    Camera.useCameraPermissions();
  const [type, setType] = useState(CameraType.back);
  const [image, setImage] = useState(null);
  const [output, setOutput] = useState(false);
  const [screen, setScreen] = useState(route.params.screen);
  const language = 'es';

  useEffect(() => {
    if (screen === 'Translate') {
      console.log('HERE IS THE SCREEN', screen, typeof screen);
    } else {
      console.log('HERE IS THE SCREEN', screen);
    }
  }, [route.params?.screen]);

  if (!cameraPermission) {
    requestCameraPermission();
  }

  const takePhoto = async () => {
    if (cameraRef.current) {
      try {
        const photo = await cameraRef.current.takePictureAsync();
        setImage(photo.uri);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const translate = async () => {
    console.log('translate');
    try {
      const data = await (
        await postTranslate(language, 'test.JPG')
      ).data.translatedResult;
      navigation.navigate(SCREEN_NAMES.Translate, { translation: data });
    } catch (error) {
      console.log(error);
    }
  };

  const switchCamera = () => {
    setType(type === CameraType.back ? CameraType.front : CameraType.back);
  };

  return (
    <View style={styles.container}>
      {!image ? (
        <Camera style={styles.camera} ref={cameraRef} type={type} />
      ) : (
        <Image source={{ uri: image }} style={styles.camera} />
      )}
      <View>
        {!image ? (
          <View style={styles.mainButtonContainer}>
            <TouchableOpacity
              style={styles.cameraButton}
              onPress={() => {
                takePhoto();
              }}
            ></TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                switchCamera();
              }}
              style={styles.icon}
            >
              <FlipCameraIcon width={50} height={45.24} />
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.buttonContainer}>
            <Button variant="primaryLightCamera" onPress={() => setImage(null)}>
              Retake
            </Button>

            {screen === 'Translate' ? (
              <Button variant="primaryCamera" onPress={translate}>
                Translate
              </Button>
            ) : (
              <Button
                variant="primaryCamera"
                onPress={() => console.log('here')}
              >
                Submit
              </Button>
            )}
          </View>
        )}
      </View>
    </View>
  );
};

export default CameraScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'black',
    height: 100,
    paddingHorizontal: 20,
  },
  mainButtonContainer: {
    justifyContent: 'center',
    position: 'relative',
    backgroundColor: 'black',
    opacity: 1,
    height: 100,
  },
  cameraButton: {
    backgroundColor: 'white',
    opacity: 1,
    borderRadius: 50,
    margin: 20,
    width: 70,
    height: 70,
    position: 'absolute',
    bottom: 0,
    alignSelf: 'center',
  },
  icon: {
    position: 'absolute',
    right: 20,
  },
});

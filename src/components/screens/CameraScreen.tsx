import { Camera, CameraType } from 'expo-camera';
import { Button, Spinner, View } from 'native-base';
import { useEffect, useRef, useState } from 'react';
import { Image, StyleSheet, TouchableOpacity } from 'react-native';
import FlipCameraIcon from '../../../assets/icons/switch-camera.svg';
import { postTranslate } from '../../services/translate.service';
import { SCREEN_NAMES } from '../../utils/const';

const CameraScreen = (props) => {
  const { navigation, route } = props;
  const cameraRef = useRef<Camera>();
  const [cameraPermission, requestCameraPermission] =
    Camera.useCameraPermissions();
  const [type, setType] = useState(CameraType.back);
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [screen, setScreen] = useState(route.params.screen);
  const [loading, setLoading] = useState(false);
  const verification = route.params.verification;
  const language = 'es';

  if (!cameraPermission) {
    requestCameraPermission();
  }

  const takePhoto = async () => {
    if (cameraRef.current) {
      try {
        const photo = await cameraRef.current.takePictureAsync({
          base64: true,
          quality: 0.5,
        });
        setImage(photo.base64);
        setPreview(photo.uri);
      } catch (error) {
        console.error(error);
      }
    }
  };

  const translate = async () => {
    setLoading(true);
    try {
      const data = await (await postTranslate(language, image)).data;
      navigation.navigate(SCREEN_NAMES.Translate, {
        translation: data.translatedResult,
        text: data.text,
        image: image,
      });
      setImage(null);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  const submit = async () => {
    setLoading(true);
    if (verification === 'id') {
      console.log('ID');
      navigation.navigate(SCREEN_NAMES.IDVerification, {
        imageID: image,
      });
    } else {
      navigation.navigate(SCREEN_NAMES.IDVerification, {
        imageSelfie: image,
      });
    }
    setImage(null);
    setLoading(false);
  };

  useEffect(() => {
    if (verification === 'selfie') {
      setType(CameraType.front);
    }
  }, []);

  const switchCamera = () => {
    setType(type === CameraType.back ? CameraType.front : CameraType.back);
  };

  return (
    <View style={styles.container}>
      {!image ? (
        <Camera
          style={styles.camera}
          ref={cameraRef}
          type={type}
          ratio="16:9"
        />
      ) : (
        <Image source={{ uri: preview }} style={styles.camera} />
      )}
      {loading ? (
        <Spinner size={70} color="coral" style={styles.loader} />
      ) : null}
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

            {screen === SCREEN_NAMES.Translate ? (
              <Button variant="primaryCamera" onPress={translate}>
                Translate
              </Button>
            ) : (
              <Button variant="primaryCamera" onPress={submit}>
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
  loader: {
    alignSelf: 'center',
    top: '50%',
    bottom: '50%',
    position: 'absolute',
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
  spinnercontainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

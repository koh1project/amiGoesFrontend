import { Camera, CameraType } from 'expo-camera';
import { useRef, useState } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { postTranslate } from '../../services/translate.service';
import { PrimaryButton } from '../buttons/PrimaryButton';

const CameraScreen = (props) => {
  const { navigation } = props;
  const cameraRef = useRef();
  const [cameraPermission, requestCameraPermission] =
    Camera.useCameraPermissions();
  const [type, setType] = useState(CameraType.back);
  const [image, setImage] = useState(null);
  const [output, setOutput] = useState(false);
  const language = 'es';

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
    try {
      const data = await (
        await postTranslate(language, 'test.JPG')
      ).data.translatedResult;
      navigation.navigate('Translate', { translation: data });
    } catch (error) {
      console.log(error);
    }
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
          <PrimaryButton
            label="Take Photo"
            onPress={takePhoto}
            style={[styles.button]}
          />
        ) : (
          <View style={styles.buttonContainer}>
            <PrimaryButton
              label="Retake Photo"
              onPress={() => setImage(null)}
              style={[styles.button]}
            />

            <PrimaryButton
              label="Translate"
              onPress={translate}
              style={[styles.button]}
            />
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
  button: {
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    padding: 10,
    borderRadius: 30,
    marginBottom: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '700',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 50,
  },
});

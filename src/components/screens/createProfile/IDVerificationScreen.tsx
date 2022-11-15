import { Button, Text, View } from 'native-base';
import { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { compareFaces } from '../../../services/verification.service';

const IDVerificationScreen = ({ navigation, route }) => {
  const [imageID, setImageID] = useState(null);
  const [imageSelfie, setImageSelfie] = useState(null);

  useEffect(() => {
    if (route.params?.imageID) {
      setImageID(route.params.imageID);
    }
  }, [route.params?.imageID]);

  useEffect(() => {
    if (route.params?.imageSelfie) {
      setImageSelfie(route.params.imageSelfie);
    }
  }, [route.params?.imageSelfie]);

  const verify = async (imageID, imageSelfie) => {
    try {
      const data = await compareFaces(imageID, imageSelfie);
      console.log('data', data);
    } catch (error) {
      console.error(error);
    }
  };

  if (imageID && imageSelfie) {
    verify(imageID, imageSelfie);
  }

  const openCamera = (type) => {
    console.log('openCamera', type);
    navigation.navigate('Camera', {
      navigation: navigation,
      verification: type,
    });
  };

  return (
    <View style={styles.container}>
      <Text variant="screenTitle">ID Verification</Text>
      <View style={{ marginHorizontal: 20 }}>
        <Text>
          {' '}
          We need to determine if the identity document is authentic and belongs
          to you.
        </Text>
        <Text style={{ marginTop: 20 }}>
          {' '}
          Place ID on a plain dark surface and make sure all four corners are
          visible.
        </Text>
        <Button
          variant="primaryLargeLight"
          onPress={() => openCamera('id')}
          alignSelf="center"
          marginTop="20px"
        >
          Take ID Photo
        </Button>
        <Text style={{ marginTop: 20 }}>
          {' '}
          Your face must be clearly visible. Avoid shadows and background
          lights.
        </Text>
        <Button
          variant={!imageID ? 'disabledLarge' : 'primaryLargeLight'}
          onPress={() => openCamera('selfie')}
          alignSelf="center"
          marginTop="20px"
          disabled={!imageID}
        >
          Take a Selfie
        </Button>
      </View>
    </View>
  );
};

export default IDVerificationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});

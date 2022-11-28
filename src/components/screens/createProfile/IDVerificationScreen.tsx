import { Button, Modal, Text, View } from 'native-base';
import { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import Close from '../../../../assets/icons/close.svg';
import i18n from '../../../localization/Localization';
import { compareFaces } from '../../../services/verification.service';
const IDVerificationScreen = ({ navigation, route }) => {
  const [imageID, setImageID] = useState(null);
  const [imageSelfie, setImageSelfie] = useState(null);
  const [isVerified, setIsVerified] = useState(false);
  const [color, setColor] = useState(undefined);
  const [message, setMessage] = useState(undefined);

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

  const openModal = (color) => {
    setIsVerified(true);
    setColor(color);
  };

  const verify = async (imageID, imageSelfie) => {
    try {
      const data = await compareFaces(imageID, imageSelfie);

      if (data.data.data.code === 1) {
        openModal('#C7F0F2');
        setMessage('ID was verified.');
      }
      if (data.data.data.code === 0) {
        openModal('#EA3A3D');
        setMessage(data.data.data.message);
      }
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
      <Text variant="screenTitle"> {i18n.t('idVerification.title')}</Text>
      <View style={{ marginHorizontal: 20 }}>
        <Text>{i18n.t('idVerification.description')}</Text>
        <Text style={{ marginTop: 20 }}>
          {i18n.t('idVerification.description2')}
        </Text>
        <Button
          variant="primaryLargeLight"
          onPress={() => openCamera('id')}
          alignSelf="center"
          marginTop="20px"
        >
          {i18n.t('idVerification.button1')}
        </Button>
        <Text style={{ marginTop: 20 }}>
          {i18n.t('idVerification.description3')}
        </Text>
        <Button
          variant={!imageID ? 'disabledLarge' : 'primaryLargeLight'}
          onPress={() => openCamera('selfie')}
          alignSelf="center"
          marginTop="20px"
          disabled={!imageID}
        >
          {i18n.t('idVerification.button2')}
        </Button>
      </View>
      <Modal
        isOpen={isVerified}
        onClose={() => console.log('close')}
        safeAreaTop={true}
      >
        <Modal.Content
          maxWidth="350"
          style={styles.disclaimer}
          backgroundColor={color}
        >
          <Close
            style={styles.close}
            onPress={() =>
              navigation.navigate('CreateProfileStepOneForm', {
                verified: isVerified,
              })
            }
          />
          <Text variant={'disclaimer'}>{message}</Text>
        </Modal.Content>
      </Modal>
    </View>
  );
};

export default IDVerificationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  disclaimer: {
    padding: 14,
    borderRadius: 6,
    flexDirection: 'row',
    marginBottom: 24,
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center',
    height: 100,
  },
  close: {
    position: 'absolute',
    right: 10,
    top: 10,
  },
});

import { Button, Modal, Text, View } from 'native-base';
import { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import Close from '../../../../assets/icons/close.svg';
import i18n from '../../../localization/Localization';
import { compareFaces, verifyId } from '../../../services/verification.service';
const IDVerificationScreen = ({ navigation, route }) => {
  const [imageID, setImageID] = useState(null);
  const [imageSelfie, setImageSelfie] = useState(null);
  const [isVerified, setIsVerified] = useState(false);
  const [color, setColor] = useState(undefined);
  const [message, setMessage] = useState(undefined);
  const [isModalVisible, setIsModalVisible] = useState(false);

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
    setIsModalVisible(true);
    setColor(color);
  };

  const messages = {
    success: i18n.t('idVerification.success'),
    error: i18n.t('idVerification.error'),
    error2: i18n.t('idVerification.error2'),
    error3: i18n.t('idVerification.error3'),
  };

  const verify = async (imageID, imageSelfie) => {
    try {
      const id = await verifyId(imageID);

      const confidence = id.data.data.CustomLabels;
      if (confidence.length > 0) {
        if (confidence[0].Confidence > 80) {
          const data = await compareFaces(imageID, imageSelfie);

          if (data.data.data.code === 1) {
            setIsVerified(true);
            openModal('#C7F0F2');
            setMessage(messages.success);
          } else if (data.data.data.code === 0) {
            setMessage(messages.error3);
            openModal('#FFE4E0');
          } else if (data.data.data.code === 2) {
            setMessage(messages.error2);
            openModal('#FFE4E0');
          }
        } else {
          openModal('#FFE4E0');
          setMessage(messages.error);
        }
      } else {
        console.log('error');
        openModal('#FFE4E0', false);
        setMessage(messages.error);
      }
    } catch (error) {
      console.error(error);
    }
  };

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
          variant={!imageID ? 'primaryLargeLight' : 'disabledLarge'}
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
          variant={
            !imageID || imageSelfie ? 'disabledLarge' : 'primaryLargeLight'
          }
          onPress={() => openCamera('selfie')}
          alignSelf="center"
          marginTop="20px"
          disabled={!imageID}
        >
          {i18n.t('idVerification.button2')}
        </Button>
        <Button
          variant={!imageID && !imageSelfie ? 'disabledLarge' : 'primaryLarge'}
          onPress={() => verify(imageID, imageSelfie)}
          alignSelf="center"
          marginTop="20px"
          disabled={!imageID && !imageSelfie}
        >
          {i18n.t('idVerification.button3')}
        </Button>
      </View>
      <Modal
        isOpen={isModalVisible}
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

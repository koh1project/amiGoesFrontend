import { Box, Button, HStack, Text, View, VStack } from 'native-base';
import { Image, StyleSheet } from 'react-native';
import Arrows from '../../../assets/icons/arrows-icon.svg';
import Camera from '../../../assets/icons/camera-fill.svg';
import english from '../../../assets/icons/en-icon.png';
import spanish from '../../../assets/icons/es-icon.png';
import Upload from '../../../assets/icons/upload.svg';
import { SCREEN_NAMES } from '../../utils/const';

const TranslateForm = (props) => {
  const { navigation, route } = props;

  const openCamera = () => {
    navigation.navigate('Camera', {
      navigation: navigation,
      screen: SCREEN_NAMES.Translate,
    });
  };

  return (
    <VStack>
      <View marginLeft={'20px'} marginRight={'20px'}>
        <Text variant="body" marginBottom={'30px'}>
          The following tool allows you to convert images to text. Please set
          the language you would like to translate to.
        </Text>
        <Box style={styles.languages}>
          <VStack style={styles.languageContainer}>
            <Image source={english} style={styles.flag} />
            <Text variant="h4">English</Text>
          </VStack>
          <Arrows />
          <VStack style={styles.languageContainer}>
            <Image source={spanish} style={styles.flag} />
            <Text variant="h4">Spanish</Text>
          </VStack>
        </Box>
      </View>
      <VStack style={styles.buttonContainer}>
        <Text variant="body">
          Transform a photo into text by uploading or taking one.
        </Text>
        <HStack marginTop={'11.5px'}>
          <Button variant="cameraBigBtnLight" marginRight={'12px'}>
            <Upload style={styles.icon} />
            Upload
          </Button>
          <Button onPress={openCamera} variant="cameraBigBtn">
            <Camera style={styles.icon} />
            Camera
          </Button>
        </HStack>
      </VStack>
    </VStack>
  );
};

export default TranslateForm;

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'column',
    marginHorizontal: 21,
    paddingTop: 22.5,
    marginTop: 23,
    borderTopColor: 'gray',
    borderTopWidth: 1,
  },
  icon: {
    marginBottom: 10,
  },
  flag: {
    width: 65,
    height: 64,
  },
  languages: {
    height: 120,
    backgroundColor: '#C7F0F2',
    borderRadius: 6,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  languageContainer: {
    alignItems: 'center',
    marginHorizontal: 12,
  },
});

import { Box, Button, HStack, Text, View, VStack } from 'native-base';
import { StyleSheet } from 'react-native';
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
        <Box bg="warmGray.200" p="12">
          {' '}
          English to Spanish{' '}
        </Box>
      </View>
      <VStack style={styles.buttonContainer}>
        <Text variant="body">
          Transform a photo into text by uploading or taking one.
        </Text>
        <HStack marginTop={'11.5px'}>
          <Button variant="cameraBigBtnLight" marginRight={'12px'}>
            {/* <Upload style={styles.icon} /> */}
            Upload
          </Button>
          <Button onPress={openCamera} variant="cameraBigBtn">
            {/* <Camera style={styles.icon} /> */}
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
    backgroundColor: 'rgba(195, 195, 195, 0.6)',
    flexDirection: 'column',
    height: 400,
    paddingHorizontal: 20,
    paddingTop: 22.5,
    marginTop: 23,
  },
  icon: {
    marginBottom: 10,
  },
});

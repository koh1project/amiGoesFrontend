import { Box, Heading, HStack, Text, VStack } from 'native-base';
import IconButton from '../buttons/IconButton';

const TranslateForm = (props) => {
  const { navigation, route } = props;

  const openCamera = () => {
    navigation.navigate('Camera', {
      navigation: navigation,
      screen: 'Translate',
    });
  };

  return (
    <VStack>
      <Heading>Translate</Heading>
      <Text>
        The following tool allows you to convert images to text. Please set the
        language you would like to translate to.
      </Text>
      <Box bg="warmGray.200" p="12">
        {' '}
        English to Spanish{' '}
      </Box>
      <VStack>
        <Text>Transform a photo into text by uploading or taking one.</Text>
        <HStack space={3} justifyContent="center">
          <IconButton
            text="Upload"
            onPress={() =>
              navigation.navigate('Camera', { navigation: navigation })
            }
          />

          <IconButton text="Camera" action={openCamera} />
        </HStack>
      </VStack>
    </VStack>
  );
};

export default TranslateForm;

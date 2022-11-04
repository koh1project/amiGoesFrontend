import { Box, HStack, Text, VStack } from 'native-base';
import { Image, StyleSheet } from 'react-native';
import english from '../../../assets/icons/en-icon.png';
import spanish from '../../../assets/icons/es-icon.png';

const TranslateResults = (props) => {
  const { translation, text, image } = props;
  const img = 'data:image/png;base64,' + image;

  return (
    <VStack>
      <Text marginLeft={'20px'} marginRight={'20px'} marginBottom={'30px'}>
        The following tool allows you to convert images to text. Please set the
        language you would like to translate to.
      </Text>

      <Image
        style={{
          width: '100%',
          height: 372,
          resizeMode: 'contain',
          borderWidth: 1,
          marginBottom: 25,
        }}
        source={{ uri: img }}
      />
      <Box style={styles.textContainer}>
        <HStack style={styles.language}>
          <Image source={english} style={styles.icon} />
          <Text variant="h4">English</Text>
        </HStack>
        <Text marginLeft={'20px'} marginRight={'20px'} marginBottom={'30px'}>
          {text}
        </Text>
      </Box>
      <Box style={styles.textContainer}>
        <HStack style={styles.language}>
          <Image source={spanish} style={styles.icon} />
          <Text variant="h4">Spanish</Text>
        </HStack>
        <Text marginLeft={'20px'} marginRight={'20px'} marginBottom={'30px'}>
          {translation}
        </Text>
      </Box>
    </VStack>
  );
};

export default TranslateResults;

const styles = StyleSheet.create({
  textContainer: {
    borderTopColor: 'gray',
    borderTopWidth: 1,
    paddingTop: 20,
    paddingBottom: 20,
    marginHorizontal: 21,
  },
  icon: {
    width: 32.95,
    height: 32.45,
    marginRight: 10,
  },
  language: {
    alignItems: 'center',
    marginBottom: 8,
  },
});

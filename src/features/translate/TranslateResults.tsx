import { Box, HStack, Text, VStack } from 'native-base';
import { Image, StyleSheet } from 'react-native';
import english from '../../../assets/icons/en-icon.png';
import spanish from '../../../assets/icons/es-icon.png';
import i18n from '../../localization/Localization';

const TranslateResults = (props) => {
  const { translation, text, image } = props;
  const img = 'data:image/png;base64,' + image;

  console.log(translation);

  return (
    <VStack>
      <Text marginLeft={'20px'} marginRight={'20px'} marginBottom={'30px'}>
        {i18n.t('TranslateScreen.DescriptionResults')}
      </Text>

      <Image
        style={{
          maxWidth: '100%',
          height: 372,
          resizeMode: 'cover',
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
        {text.map((line, index) => (
          <Text
            key={index}
            marginLeft={'20px'}
            marginRight={'20px'}
            marginBottom={'2px'}
          >
            {line}
          </Text>
        ))}
      </Box>
      <Box style={styles.textContainer}>
        <HStack style={styles.language}>
          <Image source={spanish} style={styles.icon} />
          <Text variant="h4">Spanish</Text>
        </HStack>
        {translation.map((line, index) => (
          <Text
            key={index}
            marginLeft={'20px'}
            marginRight={'20px'}
            marginBottom={'2px'}
          >
            {line}
          </Text>
        ))}
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

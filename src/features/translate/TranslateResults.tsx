import { Text, VStack } from 'native-base';

const TranslateResults = (props) => {
  const { translation, text } = props;

  return (
    <VStack>
      <Text marginLeft={'20px'} marginRight={'20px'} marginBottom={'30px'}>
        The following tool allows you to convert images to text. Please set the
        language you would like to translate to.
      </Text>
      {/* TODO: Jatin Display image here */}
      {/* <Image
        source={{
          uri: '',
        }}
        alt="translation"
      /> */}
      <Text marginLeft={'20px'} marginRight={'20px'} marginBottom={'30px'}>
        {translation}
      </Text>
      <Text marginLeft={'20px'} marginRight={'20px'} marginBottom={'30px'}>
        {text}
      </Text>
    </VStack>
  );
};

export default TranslateResults;

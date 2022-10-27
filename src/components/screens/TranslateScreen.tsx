import { useIsFocused } from '@react-navigation/native';
import { Box, Heading, HStack, VStack } from 'native-base';
import { StyleSheet, Text, View } from 'react-native';
import IconBtn from '../buttons/IconBtn';

const TranslateScreen = ({ navigation, route }) => {
  const isFocused = useIsFocused();

  const openCamera = () => {
    navigation.navigate('Camera');
  };

  return (
    <View style={styles.container}>
      <VStack>
        <Heading>Translate</Heading>
        <Text>
          The following tool allows you to convert images to text. Please set
          the language you would like to translate to.
        </Text>
        <Box bg="warmGray.200" p="12">
          {' '}
          English to Spanish{' '}
        </Box>
        <VStack>
          <Text>Transform a photo into text by uploading or taking one.</Text>
          <HStack space={3} justifyContent="center">
            <IconBtn
              text="Upload"
              onPress={() => navigation.navigate('Camera')}
            />
            <IconBtn text="Camera" action={openCamera} />
          </HStack>
        </VStack>
      </VStack>
    </View>
  );
};

export default TranslateScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 1,
  },
});

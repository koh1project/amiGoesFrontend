import { useIsFocused } from '@react-navigation/native';
import { StyleSheet, Text, View } from 'react-native';
import { HStack, VStack, Heading, Box } from "native-base";
import { useEffect, useRef, useState } from 'react';
import { Camera } from 'expo-camera';
import { shareAsync } from 'expo-sharing'
import * as MediaLibrary from 'expo-media-library';
import IconBtn from '../buttons/IconBtn';

const TranslateScreen = ({ navigation, route }) => {
  const isFocused = useIsFocused();

  let cameraRef = useRef();
  const [hasCameraPermission, setHasCameraPermission] = useState();

  return (
    <View style={styles.container}>
      <VStack>
        <Heading>Translate</Heading>
        <Text>The following tool allows you to convert images to text. Please set the language you would like to translate to.</Text>
        <Box
         bg="warmGray.200"
         p="12"
        > English to Spanish </Box>
      <VStack>
        <Text>Transform a photo into text by uploading or taking one.</Text>
        <HStack space={3} justifyContent="center">
          <IconBtn text="Upload" />
          <IconBtn text="Camera" />
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
    margin:1,

  },
});

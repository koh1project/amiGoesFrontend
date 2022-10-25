import { useIsFocused } from '@react-navigation/native';
import { StyleSheet, Text, View } from 'react-native';

const TranslateScreen = ({ navigation, route }) => {
  const isFocused = useIsFocused();

  return (
    <View style={styles.container}>
      <Text>Translate Screen</Text>
    </View>
  );
};

export default TranslateScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

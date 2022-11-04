import { Text } from 'native-base';
import { StyleSheet, View } from 'react-native';

import TranslateResults from '../../features/translate/TranslateResults';
import TranslateForm from '../forms/TranslateForm';

const TranslateScreen = ({ navigation, route }) => {
  // useEffect(() => {
  //   if (route.params?.translation) {
  //     console.log('HERE IS THE TRANSLATION', route.params.translation);
  //   }
  // }, [route.params?.translation]);

  return (
    <View style={styles.container}>
      <Text variant="screenTitle">Translate</Text>
      {route.params?.translation ? (
        <View>
          <TranslateResults
            translation={route.params.translation}
            text={route.params.text}
          />
        </View>
      ) : (
        <TranslateForm navigation={navigation} />
      )}
    </View>
  );
};

export default TranslateScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});

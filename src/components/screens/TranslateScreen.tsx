import { StyleSheet, Text, View } from 'react-native';

import TranslateForm from '../forms/TranslateForm';

const TranslateScreen = ({ navigation, route }) => {
  // useEffect(() => {
  //   if (route.params?.translation) {
  //     console.log('HERE IS THE TRANSLATION', route.params.translation);
  //   }
  // }, [route.params?.translation]);

  return (
    <View style={styles.container}>
      {route.params?.translation ? (
        <View style={{ padding: 10 }}>
          <Text>{route.params.translation}</Text>
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
    margin: 1,
  },
});

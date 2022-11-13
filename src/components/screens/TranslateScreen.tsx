import { Text } from 'native-base';
import { ScrollView, StyleSheet, View } from 'react-native';

import TranslateResults from '../../features/translate/TranslateResults';
import TranslateForm from '../forms/TranslateForm';

const TranslateScreen = ({ navigation, route }) => {
  return (
    <ScrollView style={styles.container}>
      <View>
        <Text variant="screenTitle">Translate</Text>
        {route.params?.translation ? (
          <View>
            <TranslateResults
              translation={route.params.translation}
              text={route.params.text}
              image={route.params.image}
            />
          </View>
        ) : (
          <TranslateForm navigation={navigation} />
        )}
      </View>
    </ScrollView>
  );
};

export default TranslateScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});

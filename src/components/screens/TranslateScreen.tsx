import { Text } from 'native-base';
import { ScrollView, StyleSheet, View } from 'react-native';
import i18n from '../../localization/Localization';

import TranslateResults from '../../features/translate/TranslateResults';
import TranslateForm from '../forms/TranslateForm';

const TranslateScreen = ({ navigation, route }) => {
  return (
    <ScrollView style={styles.container}>
      <View>
        <Text variant="screenTitle" marginTop={'26px'}>
          {i18n.t('TranslateScreen.Title')}
        </Text>
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

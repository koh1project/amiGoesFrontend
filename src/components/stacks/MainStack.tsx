import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TranslateScreen from '../screens/TranslateScreen';

const Stack = createNativeStackNavigator();

const MainStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Translate" component={TranslateScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainStack;

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { DiscoverScreen } from './components/screens/DiscoverScreen';
import IndexScreen from './components/screens/IndexScreen';
import LoginScreen from './components/screens/LoginScreen';
import SignupScreen from './components/screens/SignupScreen';
import { INITIAL_SCREEN, SCREEN_NAMES } from './const';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={INITIAL_SCREEN}>
        <Stack.Screen
          options={{ headerShown: false }}
          name={SCREEN_NAMES.Signup}
          component={SignupScreen}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name={SCREEN_NAMES.Login}
          component={LoginScreen}
        />
        <Stack.Screen name={SCREEN_NAMES.Index} component={IndexScreen} />
        <Stack.Screen name={SCREEN_NAMES.Discover} component={DiscoverScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

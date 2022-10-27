import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './components/screens/LoginScreen';
import SignupScreen from './components/screens/SignupScreen';
import IndexScreen from './components/screens/IndexScreen';
import { DiscoverScreen } from './components/screens/DiscoverScreen';
import { StepOneForm } from './components/screens/createProfile/StepOneForm';
import { SCREEN_NAMES, INITIAL_SCREEN } from './const';

const Stack = createNativeStackNavigator();

export default function App() {
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
        <Stack.Screen 
          name={SCREEN_NAMES.CreateProfileStepOneForm} 
          component={StepOneForm} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

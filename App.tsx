import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NativeBaseProvider } from 'native-base';
import { Header } from './components/headers/Header';
import CameraScreen from './components/screens/CameraScreen';
import { StepOneForm } from './components/screens/createProfile/StepOneForm';
import { StepTwoForm } from './components/screens/createProfile/StepTwoForm';
import { DiscoverScreen } from './components/screens/DiscoverScreen';
import IndexScreen from './components/screens/IndexScreen';
import LoginScreen from './components/screens/LoginScreen';
import SignupScreen from './components/screens/SignupScreen';
import TranslateScreen from './components/screens/TranslateScreen';
import { INITIAL_SCREEN, SCREEN_NAMES } from './const';

const Stack = createNativeStackNavigator();
console.log(INITIAL_SCREEN);

export default function App() {
  return (
    <NativeBaseProvider>
      <NavigationContainer>
        <Header />
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
          <Stack.Screen
            name={SCREEN_NAMES.Discover}
            component={DiscoverScreen}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
        <Stack.Screen
          name={SCREEN_NAMES.CreateProfileStepOneForm}
          component={StepOneForm}
        />
        <Stack.Screen
          name={SCREEN_NAMES.CreateProfileStepTwoForm}
          component={StepTwoForm}
        />
         <Stack.Screen
            name={SCREEN_NAMES.Translate}
            component={TranslateScreen}
          />
          <Stack.Screen name={SCREEN_NAMES.Camera} component={CameraScreen} />
      </NavigationContainer>
    </NativeBaseProvider>
  );
}

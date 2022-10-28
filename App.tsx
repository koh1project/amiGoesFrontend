import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NativeBaseProvider } from 'native-base';
import { Header } from './src/components/headers/Header';
import CameraScreen from './src/components/screens/CameraScreen';
import ConnectFilterScreen from './src/components/screens/Connect/ConnectFiltersScreen';
import { StepOneForm } from './src/components/screens/createProfile/StepOneForm';
import { StepTwoForm } from './src/components/screens/createProfile/StepTwoForm';
import { DiscoverScreen } from './src/components/screens/DiscoverScreen';
import IndexScreen from './src/components/screens/IndexScreen';
import LoginScreen from './src/components/screens/LoginScreen';
import SignupScreen from './src/components/screens/SignupScreen';
import TranslateScreen from './src/components/screens/TranslateScreen';
import { RootStackParamList } from './src/types/navigation';
import { INITIAL_SCREEN, SCREEN_NAMES } from './src/utils/const';

const Stack = createNativeStackNavigator<RootStackParamList>();

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
          <Stack.Screen
            name={SCREEN_NAMES.ConnectFilter}
            component={ConnectFilterScreen}
            options={{ headerShown: false }}
          />
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
        </Stack.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>
  );
}

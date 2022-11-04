import {
  Ubuntu_300Light,
  Ubuntu_400Regular,
  Ubuntu_500Medium,
  Ubuntu_700Bold,
  useFonts,
} from '@expo-google-fonts/ubuntu';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NativeBaseProvider, StatusBar } from 'native-base';
import { useEffect, useState } from 'react';
import { Header } from './src/components/headers/Header';
import CameraScreen from './src/components/screens/CameraScreen';
import ConnectFilterScreen from './src/components/screens/Connect/ConnectFiltersScreen';
import { StepOneForm } from './src/components/screens/createProfile/StepOneForm';
import { StepTwoForm } from './src/components/screens/createProfile/StepTwoForm';
import { DiscoverScreen } from './src/components/screens/DiscoverScreen';
import IndexScreen from './src/components/screens/IndexScreen';
import LoginScreen from './src/components/screens/LoginScreen';
import SignupScreen from './src/components/screens/SignupScreen';
import SplashScreen from './src/components/screens/SplashScreen';
import TranslateScreen from './src/components/screens/TranslateScreen';
import { customTheme } from './src/theme';

import { RootStackParamList } from './src/types/navigation';
import { INITIAL_SCREEN, SCREEN_NAMES } from './src/utils/const';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  const [isReady, setIsReady] = useState(false);

  const [fontsLoaded] = useFonts({
    Ubuntu_300Light,
    Ubuntu_400Regular,
    Ubuntu_500Medium,
    Ubuntu_700Bold,
  });

  useEffect(() => {
    setTimeout(() => {
      setIsReady(true);
    }, 6000);
  }, []);

  if (!isReady && fontsLoaded) {
    return (
      <NativeBaseProvider theme={customTheme}>
        <StatusBar barStyle="light-content" backgroundColor="#EE6653" />
        <SplashScreen />
      </NativeBaseProvider>
    );
  } else {
    return (
      <NativeBaseProvider theme={customTheme}>
        <StatusBar barStyle="light-content" backgroundColor="#3FA8AE" />
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
            <Stack.Screen
              name={SCREEN_NAMES.Index}
              component={IndexScreen}
              options={{
                header: () => <Header />,
                headerShown: true,
              }}
            />
            <Stack.Screen
              name={SCREEN_NAMES.Discover}
              component={DiscoverScreen}
              options={{
                header: () => <Header />,
                headerShown: true,
              }}
            />
            <Stack.Screen
              name={SCREEN_NAMES.ConnectFilter}
              component={ConnectFilterScreen}
              options={{
                header: () => <Header />,
                headerShown: true,
              }}
            />
            <Stack.Screen
              name={SCREEN_NAMES.CreateProfileStepOneForm}
              component={StepOneForm}
              options={{
                header: () => <Header />,
                headerShown: true,
              }}
            />
            <Stack.Screen
              name={SCREEN_NAMES.CreateProfileStepTwoForm}
              component={StepTwoForm}
              options={{
                header: () => <Header />,
                headerShown: true,
              }}
            />
            <Stack.Screen
              options={{
                header: () => <Header />,
                headerShown: true,
              }}
              name={SCREEN_NAMES.Translate}
              component={TranslateScreen}
            />
            <Stack.Screen
              options={{ headerShown: false }}
              name={SCREEN_NAMES.Camera}
              component={CameraScreen}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </NativeBaseProvider>
    );
  }
}

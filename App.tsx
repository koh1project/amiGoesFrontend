import {
  Ubuntu_300Light,
  Ubuntu_400Regular,
  Ubuntu_500Medium,
  Ubuntu_700Bold,
  useFonts,
} from '@expo-google-fonts/ubuntu';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NativeBaseProvider, StatusBar, View } from 'native-base';
import React, { useEffect, useState } from 'react';
import { Header } from './src/components/headers/Header';
import CameraScreen from './src/components/screens/CameraScreen';
import ConnectFilterScreen from './src/components/screens/Connect/ConnectFiltersScreen';
import { ConnectUsers } from './src/components/screens/Connect/ConnectUsers';
import { StepOneForm } from './src/components/screens/createProfile/StepOneForm';
import { StepTwoForm } from './src/components/screens/createProfile/StepTwoForm';
import { DiscoverScreen } from './src/components/screens/discover/DiscoverScreen';
import { GoNowScreen } from './src/components/screens/discover/GoNowScreen';
import { PlaceProfileScreen } from './src/components/screens/discover/PlaceProfileScreen';
import IndexScreen from './src/components/screens/IndexScreen';
import LoginScreen from './src/components/screens/LoginScreen';
import Onboarding from './src/components/screens/Onboarding';
import SignupScreen from './src/components/screens/SignupScreen';
import SplashScreen from './src/components/screens/SplashScreen';
import TranslateScreen from './src/components/screens/TranslateScreen';
import i18n from './src/localization/Localization';
import { customTheme } from './src/theme';

import { AuthContextProvider } from './src/components/auth/AuthContextProvider';
import ConnectUserProfile from './src/components/screens/Connect/ConnectUserProfile';
import IDVerificationScreen from './src/components/screens/createProfile/IDVerificationScreen';
import BlockedUsersScreen from './src/components/screens/myAmigoes/BlockedUsersScreen';
import ConnectedUsersScreen from './src/components/screens/myAmigoes/ConnectedUsersScreen';
import { RootStackParamList } from './src/types/navigation';
import { INITIAL_SCREEN, SCREEN_NAMES } from './src/utils/const';
import UserProfileScreen from './src/components/screens/myAmigoes/UserProfileScreen';
import EmergencyScreen from './src/components/screens/myAmigoes/EmergencyScreen';

const TabNavigator = createMaterialTopTabNavigator();
function MyAmigoesTabNavigator() {
  return (
    <TabNavigator.Navigator>
      <TabNavigator.Screen
        name={i18n.t('ConnectedandBlockedTabs.Connected')}
        component={ConnectedUsersScreen}
      />
      <TabNavigator.Screen
        name={i18n.t('ConnectedandBlockedTabs.Blocked')}
        component={BlockedUsersScreen}
      />
    </TabNavigator.Navigator>
  );
}

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
    }, 10);
  }, []);

  if (!isReady || !fontsLoaded) {
    return (
      <NativeBaseProvider theme={customTheme}>
        <StatusBar barStyle="light-content" backgroundColor="#EE6653" />
        <SplashScreen />
      </NativeBaseProvider>
    );
  } else {
    return (
      <NativeBaseProvider theme={customTheme}>
        <AuthContextProvider>
          <StatusBar barStyle="light-content" backgroundColor="#3FA8AE" />
          <NavigationContainer>
            <Stack.Navigator initialRouteName={INITIAL_SCREEN}>
              <Stack.Screen
                name={SCREEN_NAMES.Onboarding}
                component={Onboarding}
                options={{ headerShown: false }}
              />
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
                name={SCREEN_NAMES.PlaceProfile}
                component={PlaceProfileScreen}
                options={{
                  header: () => <Header />,
                  headerShown: true,
                }}
              />
              <Stack.Screen
                name={SCREEN_NAMES.GoNow}
                component={GoNowScreen}
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
                name={SCREEN_NAMES.ConnectUsers}
                component={ConnectUsers}
                options={{ headerShown: true, header: () => <Header /> }}
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
              <Stack.Screen
                component={MyAmigoesTabNavigator}
                options={{
                  header: () => <Header />,
                  headerShown: true,
                }}
                name={SCREEN_NAMES.ConnectedUsersScreen}
              />
              <Stack.Screen
                component={ConnectUserProfile}
                name={SCREEN_NAMES.ConnectUserProfile}
                options={{
                  header: () => <Header />,
                  headerShown: true,
                }}
               />
                <Stack.Screen
                component={UserProfileScreen}
                options={{
                  header: () => <Header />,
                  headerShown: true,
                }}
                name={SCREEN_NAMES.UserProfileScreen}
              />
              <Stack.Screen
                component={EmergencyScreen}
                options={{
                  header: () => <Header />,
                  headerShown: true,
                }}
                name={SCREEN_NAMES.EmergencyScreen}
              />
              <Stack.Screen
                component={IDVerificationScreen}
                name={SCREEN_NAMES.IDVerification}
                options={{
                  header: () => <Header />,
                  headerShown: true,
                }}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </AuthContextProvider>
      </NativeBaseProvider>
    );
  }
}

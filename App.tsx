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
import { NativeBaseProvider, StatusBar } from 'native-base';
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
import { EditProfile } from './src/components/screens/userProfile/EditProfile';
import { ProfileScreen } from './src/components/screens/userProfile/ProfileScreen';

import i18n from './src/localization/Localization';
import { customTheme } from './src/theme';

import { LogBox } from 'react-native';
import { AuthContextProvider } from './src/components/auth/AuthContextProvider';
import ConnectUserProfile from './src/components/screens/Connect/ConnectUserProfile';
import IDVerificationScreen from './src/components/screens/createProfile/IDVerificationScreen';
import BlockedUsersScreen from './src/components/screens/myAmigoes/BlockedUsersScreen';
import ConnectedUsersScreen from './src/components/screens/myAmigoes/ConnectedUsersScreen';
import EmergencyScreen from './src/components/screens/myAmigoes/EmergencyScreen';
import UserProfileScreen from './src/components/screens/myAmigoes/UserProfileScreen';
import { NotificationScreen } from './src/components/screens/Notifications/NotificationsScreen';
import { RootStackParamList } from './src/types/navigation';
import { INITIAL_SCREEN, SCREEN_NAMES } from './src/utils/const';
LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs();

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
    }, 6000);
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
                }}
              />
              <Stack.Screen
                name={SCREEN_NAMES.Discover}
                component={DiscoverScreen}
                options={{
                  header: () => <Header />,
                }}
              />
              <Stack.Screen
                name={SCREEN_NAMES.PlaceProfile}
                component={PlaceProfileScreen}
                options={{
                  header: () => <Header />,
                }}
              />
              <Stack.Screen
                name={SCREEN_NAMES.GoNow}
                component={GoNowScreen}
                options={{
                  header: () => <Header />,
                }}
              />
              <Stack.Screen
                name={SCREEN_NAMES.ConnectFilter}
                component={ConnectFilterScreen}
                options={{
                  header: () => <Header />,
                }}
              />
              <Stack.Screen
                name={SCREEN_NAMES.ConnectUserProfile}
                component={ConnectUserProfile}
                options={{
                  header: () => <Header />,
                }}
              />
              <Stack.Screen
                name={SCREEN_NAMES.ConnectUsers}
                component={ConnectUsers}
                options={{ header: () => <Header /> }}
              />
              <Stack.Screen
                name={SCREEN_NAMES.Profile}
                component={ProfileScreen}
                options={{
                  header: () => <Header />,
                }}
              />
              <Stack.Screen
                name={SCREEN_NAMES.EditProfile}
                component={EditProfile}
                options={{
                  header: () => <Header />,
                }}
              />
              <Stack.Screen
                name={SCREEN_NAMES.CreateProfileStepOneForm}
                component={StepOneForm}
                options={{
                  header: () => <Header />,
                }}
              />
              <Stack.Screen
                name={SCREEN_NAMES.CreateProfileStepTwoForm}
                component={StepTwoForm}
                options={{
                  header: () => <Header />,
                }}
              />
              <Stack.Screen
                options={{
                  header: () => <Header />,
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
                }}
                name={SCREEN_NAMES.ConnectedUsersScreen}
              />

              <Stack.Screen
                component={UserProfileScreen}
                options={{
                  header: () => <Header />,
                }}
                name={SCREEN_NAMES.UserProfileScreen}
              />
              <Stack.Screen
                component={EmergencyScreen}
                options={{
                  header: () => <Header />,
                }}
                name={SCREEN_NAMES.EmergencyScreen}
              />
              <Stack.Screen
                component={IDVerificationScreen}
                name={SCREEN_NAMES.IDVerification}
                options={{
                  header: () => <Header />,
                }}
              />
              <Stack.Screen
                component={NotificationScreen}
                name={SCREEN_NAMES.NotificationScreen}
                options={{
                  header: () => <Header />,
                }}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </AuthContextProvider>
      </NativeBaseProvider>
    );
  }
}

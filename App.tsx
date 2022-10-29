import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './src/components/screens/LoginScreen';
import SignupScreen from './src/components/screens/SignupScreen';
import IndexScreen from './src/components/screens/IndexScreen';
import { DiscoverScreen } from './src/components/screens/DiscoverScreen';
import { SCREEN_NAMES, INITIAL_SCREEN } from './src/utils/const';
import { Header } from './src/components/headers/Header';
import { NativeBaseProvider } from 'native-base';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import BlockedUsers from './src/components/list/BlockedUsers';
import ConnectedUsers from './src/components/list/ConnectedUsers';
const Stack = createNativeStackNavigator();

const TabNavigator = createMaterialTopTabNavigator();
function ConnectedAndBlockedScreen() {
  return (
    <TabNavigator.Navigator>
      <TabNavigator.Screen name="Connected" component={ConnectedUsers} />
      <TabNavigator.Screen name="Blocked" component={BlockedUsers} />
    </TabNavigator.Navigator>
  );
}

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
            name={SCREEN_NAMES.ConnectedAndBlockedScreen}
            component={ConnectedAndBlockedScreen}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>
  );
}

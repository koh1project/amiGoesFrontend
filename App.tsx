import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './components/screens/LoginScreen';
import SignupScreen from './components/screens/SignupScreen';
import IndexScreen from './components/screens/IndexScreen';
import { DiscoverScreen } from './components/screens/DiscoverScreen';
import { SCREEN_NAMES, INITIAL_SCREEN } from './const';
import { Header } from './components/headers/Header';
import { NativeBaseProvider } from 'native-base';
// import ConnectedAndBlockedScreen from './components/screens/ConnectedAndBlockedScreen';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import BlockedUsers from './components/list/BlockedUsers';
import ConnectedUsers from './components/list/ConnectedUsers';
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

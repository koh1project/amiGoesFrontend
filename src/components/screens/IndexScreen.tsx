import { useNavigation } from '@react-navigation/core';
import * as Notifications from 'expo-notifications';
import React, { useEffect } from 'react';

import axios from 'axios';
import { Button, View, VStack } from 'native-base';
import { useState } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import Amigos from '../../../assets/icons/amigos-icon.svg';
import Connect from '../../../assets/icons/connect-icon.svg';
import Discover from '../../../assets/icons/discover-icon.svg';
import Favorites from '../../../assets/icons/favorites-icon.svg';
import Profile from '../../../assets/icons/profile-icon.svg';
import Translate from '../../../assets/icons/translate-icon.svg';
import { useNotifications } from '../../hooks/useNotifications';
import { SCREEN_NAMES } from '../../utils/const';
import { auth } from '../../utils/firebase';
import { url } from '../../utils/url';
import { useAuthContext } from '../auth/AuthContextProvider';
import MenuItem from '../listItems/MenuItems';

const IndexScreen = () => {
  const { registerForPushNotificationsAsync, handleNotificationResponse } =
    useNotifications();
  // call useNotifications hook
  // ******************************************************
  const { user } = useAuthContext();

  useEffect(() => {
    registerForPushNotificationsAsync();
    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: true,
      }),
    });

    const responseListener =
      Notifications.addNotificationResponseReceivedListener(
        handleNotificationResponse,
      );

    return () => {
      if (responseListener) {
        Notifications.removeNotificationSubscription(responseListener);
      }
    };
  }, []);
  // ******************************************************

  const [token, setToken] = useState('');

  const navigation = useNavigation();

  // code to test authentication on backend
  // *************************************
  useEffect(() => {
    if (user === undefined) {
      navigation.navigate('Login');
    }
  }, [user]);

  // fetch data from backend home route
  const fetchData = async (token) => {
    const authHeader = 'Bearer ' + token;
    const response = await axios
      .get(`${url}/home`, {
        headers: {
          Authorization: authHeader,
        },
      })
      .then((response) => {})
      .catch((error) => {
        handleSignout(); // sign out if token is invalid
      });
  };

  const handleSignout = () => {
    auth
      .signOut()
      .then(() => {
        navigation.navigate(SCREEN_NAMES.Login as never);
      })
      .catch((error) => alert(error.message));
  };

  return (
    <View
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        display: 'flex',
        flex: 1,
      }}
    >
      <View style={styles.container}>
        <VStack style={styles.column1}>
          <TouchableOpacity
            onPress={() => navigation.navigate(SCREEN_NAMES.Discover as never)}
            style={styles.menuItem}
          >
            <MenuItem
              text="Discover"
              icon={<Discover style={styles.icon} />}
              style={styles.icon}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate(
                SCREEN_NAMES.CreateProfileStepOneForm as never,
              )
            }
            style={styles.menuItem}
          >
            <MenuItem text="Profile" icon={<Profile style={styles.icon} />} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate(SCREEN_NAMES.ConnectedUsersScreen as never)
            }
            style={styles.menuItem}
          >
            <MenuItem text="My amigoes" icon={<Amigos style={styles.icon} />} />
          </TouchableOpacity>
          <Button variant="menu" marginTop="20px">
            Account
          </Button>
        </VStack>
        <VStack style={styles.column2}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate(SCREEN_NAMES.ConnectFilter as never)
            }
            style={styles.menuItem}
          >
            <MenuItem
              text="Connect"
              icon={<Connect style={styles.icon} />}
              style={styles.icon}
            />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate(SCREEN_NAMES.Translate as never)}
            style={styles.menuItem}
          >
            <MenuItem
              text="Translate"
              icon={<Translate style={styles.icon} />}
            />
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <MenuItem
              text="Favorites"
              icon={<Favorites style={styles.icon} />}
            />
          </TouchableOpacity>
          <Button variant="menu" marginTop="20px">
            How to Use
          </Button>
        </VStack>
      </View>

      {/* <TouchableOpacity onPress={handleSignout}>
        <Text>LOG OUT</Text>
      </TouchableOpacity>
      <PrimaryButton
        label="Discover"
        onPress={() => navigation.navigate('Discover' as never)}
      />
      <PrimaryButton
        label="Create Profile"
        onPress={() =>
          navigation.navigate(SCREEN_NAMES.CreateProfileStepOneForm)
        }
      />
      <PrimaryButton
        label="Translate"
        onPress={() => navigation.navigate(SCREEN_NAMES.Translate)}
      />
      <PrimaryButton
        label="Connect"
        onPress={() => navigation.navigate(SCREEN_NAMES.ConnectFilter)}
      /> */}
    </View>
  );
};

export default IndexScreen;

const styles = StyleSheet.create({
  icon: {
    // marginBottom: 10,
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'wrap',
    flex: 1,
  },

  column1: {
    marginLeft: 20,
    marginRight: 6,
  },
  column2: {
    marginLeft: 6,
    marginRight: 20,
  },

  menuItem: {
    marginBottom: 24,
  },
});

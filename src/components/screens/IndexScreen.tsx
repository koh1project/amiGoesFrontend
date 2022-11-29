import { useNavigation } from '@react-navigation/core';
import * as Notifications from 'expo-notifications';
import React, { useCallback, useEffect } from 'react';

import { NativeStackNavigationProp } from '@react-navigation/native-stack';
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
import i18n from '../../localization/Localization';
import { setUserLocation } from '../../services/userProfile.service';
import { RootStackParamList } from '../../types/navigation';
import { SCREEN_NAMES } from '../../utils/const';
import { auth } from '../../utils/firebase';
import { url } from '../../utils/url';
import { useAuthContext } from '../auth/AuthContextProvider';
import MenuItem from '../listItems/MenuItems';

type IndexScreenNavigator = NativeStackNavigationProp<
  RootStackParamList,
  'Index'
>;

const IndexScreen = () => {
  const [token, setToken] = useState('');

  const navigation = useNavigation<IndexScreenNavigator>();

  const { registerForPushNotificationsAsync } = useNotifications();
  // call useNotifications hook
  // ******************************************************
  const { user, location } = useAuthContext();

  const updateUserLocation = useCallback(() => {
    if (location && user) {
      setUserLocation(location, user.uid);
    }
  }, [location, user]);

  useEffect(() => {
    updateUserLocation();
  }, [location, user]);

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

  /** ! Handle Notifications */
  const handleNotificationResponse = (
    response: Notifications.NotificationResponse,
  ) => {
    const data = response.notification.request.content.data;
    navigation.navigate('NotificationScreen');
  };

  // ******************************************************

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
              text={i18n.t('IndexScreen.Discover')}
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
            <MenuItem
              text={i18n.t('IndexScreen.Profile')}
              icon={<Profile style={styles.icon} />}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate(SCREEN_NAMES.ConnectedUsersScreen as never)
            }
            style={styles.menuItem}
          >
            <MenuItem
              text={i18n.t('IndexScreen.My_Amigoes')}
              icon={<Amigos style={styles.icon} />}
            />
          </TouchableOpacity>
          <Button variant="menu" marginTop="20px" onPress={handleSignout}>
            {i18n.t('IndexScreen.AccountButton')}
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
              text={i18n.t('IndexScreen.Connect')}
              icon={<Connect style={styles.icon} />}
              style={styles.icon}
            />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate(SCREEN_NAMES.Translate as never)}
            style={styles.menuItem}
          >
            <MenuItem
              text={i18n.t('IndexScreen.Translate')}
              icon={<Translate style={styles.icon} />}
            />
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <MenuItem
              text={i18n.t('IndexScreen.Favorites')}
              icon={<Favorites style={styles.icon} />}
            />
          </TouchableOpacity>
          <Button
            variant="menu"
            marginTop="20px"
            onPress={() =>
              navigation.navigate(SCREEN_NAMES.Onboarding as never)
            }
          >
            {i18n.t('IndexScreen.HowToUse_Button')}
          </Button>
        </VStack>
      </View>
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
    marginTop: 26,
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

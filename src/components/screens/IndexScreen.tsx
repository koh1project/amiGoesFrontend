import { useNavigation } from '@react-navigation/core';
import React from 'react';
import * as Notifications from 'expo-notifications';

import axios from 'axios';
import { Text, View } from 'native-base';
import { useEffect, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { SCREEN_NAMES } from '../../utils/const';
import { auth } from '../../utils/firebase';
import { url } from '../../utils/url';
import { PrimaryButton } from '../buttons/PrimaryButton';
import { useNotifications } from '../../hooks/useNotifications';

const IndexScreen = () => {
  const { registerForPushNotificationsAsync, handleNotificationRespose } =
    useNotifications();

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
        handleNotificationRespose,
      );

    return () => {
      if (responseListener) {
        Notifications.removeNotificationSubscription(responseListener);
      }
    };
  }, []);

  const [token, setToken] = useState('');

  const navigation = useNavigation();

  // code to test authentication on backend
  // *************************************
  useEffect(() => {
    if (token !== '') {
      fetchData(token);
    } else if (auth.currentUser) {
      auth.currentUser
        .getIdToken(true)
        .then((idToken) => {
          //console.log(idToken);
          setToken(idToken);
        })
        .catch((error) => {
          console.log(error);
          handleSignout();
        });
    } else {
      navigation.navigate('Login');
    }
  }, [token]);

  // fetch data from backend home route
  const fetchData = async (token) => {
    const authHeader = 'Bearer ' + token;
    const response = await axios
      .get(`${url}/home`, {
        headers: {
          Authorization: authHeader,
        },
      })
      .then((response) => {
        console.log(response.data); // response.data is the data from the backend
      })
      .catch((error) => {
        console.log('error: ', error);
        handleSignout(); // sign out if token is invalid
      });
  };

  const handleSignout = () => {
    auth
      .signOut()
      .then(() => {
        navigation.navigate('Login');
      })
      .catch((error) => alert(error.message));
  };

  return (
    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
      <TouchableOpacity onPress={handleSignout}>
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
      />
    </View>
  );
};

export default IndexScreen;

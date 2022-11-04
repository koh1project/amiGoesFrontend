import { useNavigation } from '@react-navigation/core';
import React from 'react';

import axios from 'axios';
import { View, VStack } from 'native-base';
import { useState } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import Amigos from '../../../assets/images/amigos.svg';
import Connect from '../../../assets/images/connect.svg';
import Discover from '../../../assets/images/discover.svg';
import Favorites from '../../../assets/images/favorites.svg';
import Profile from '../../../assets/images/profile.svg';
import Translate from '../../../assets/images/translate.svg';
import { SCREEN_NAMES } from '../../utils/const';
import { auth } from '../../utils/firebase';
import { url } from '../../utils/url';
import MenuItem from '../listItems/MenuItems';

const IndexScreen = () => {
  const [token, setToken] = useState('');

  const navigation = useNavigation();

  // code to test authentication on backend
  // *************************************
  // useEffect(() => {
  //   if (token !== '') {
  //     fetchData(token);
  //   } else if (auth.currentUser) {
  //     auth.currentUser
  //       .getIdToken(true)
  //       .then((idToken) => {
  //         //console.log(idToken);
  //         setToken(idToken);
  //       })
  //       .catch((error) => {
  //         console.log(error);
  //         handleSignout();
  //       });
  //   } else {
  //     navigation.navigate('Login');
  //   }
  // }, [token]);

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
          <TouchableOpacity style={styles.menuItem}>
            <MenuItem text="My amigoes" icon={<Amigos style={styles.icon} />} />
          </TouchableOpacity>
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
    height: 68,
    marginBottom: 10,
    backgroundColor: 'white',
  },
  container: {
    marginTop: 20,
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'wrap',
    // justifyContent: 'space-between',
    flex: 1,
  },

  column1: {
    marginLeft: 20,
    marginRight: 12,
  },
  column2: {
    marginLeft: 12,
    marginRight: 20,
  },

  menuItem: {
    marginBottom: 44,
  },
});

import React from 'react';
import { useNavigation } from '@react-navigation/core';

import { TouchableOpacity, Text, View } from 'react-native';
import { auth } from '../../firebase';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { url } from '../../url';
import { PrimaryButton } from '../buttons/PrimaryButton';

const IndexScreen = () => {
    const [token, setToken] = useState('')

    const navigation = useNavigation()

    // code to test authentication on backend
    // *************************************
    useEffect(() => {
        if (token !== '') {
            fetchData(token)
        } else {
            auth.currentUser.getIdToken(true).then(idToken => {
                //console.log(idToken);
                setToken(idToken)
            }).catch(error => {
                console.log(error);
                handleSignout()
            })
        }
    }, [token])

// fetch data from backend home route
    const fetchData = async (token) => {
        const authHeader = "Bearer " + token
        const response = await axios.get(`${url}/home`, {
            headers: {
                Authorization: authHeader
            }
        })
        .then(response => {
            console.log(response.data); // response.data is the data from the backend
        })
        .catch(error => {
            console.log("error: ", error);
            handleSignout() // sign out if token is invalid
        })
    }

    const handleSignout = () => {
        auth
            .signOut()
            .then(() => {
                navigation.replace('Login')
            })
            .catch(error => alert(error.message))
    }

  return (
    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
      <TouchableOpacity onPress={handleSignout}>
        <Text>LOG OUT</Text>
      </TouchableOpacity>
      <PrimaryButton
        label="Discover"
        onPress={() => navigation.navigate('Discover' as never)}
      />
    </View>
  );

export default IndexScreen
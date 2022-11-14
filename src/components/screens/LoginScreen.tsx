import { useNavigation } from '@react-navigation/core';
import { Button, KeyboardAvoidingView, Link, Text, View } from 'native-base';
import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, TextInput } from 'react-native';
import mainLogo from '../../../assets/images/mainLogo.png';
import roundLogo from '../../../assets/images/roundLogo.png';

import { auth } from '../../utils/firebase';
import { useAuthContext } from '../auth/AuthContextProvider';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { user } = useAuthContext();
  const navigation = useNavigation();

  useEffect(() => {
    if (user && user?.uid) {
      navigation.navigate('Index');
    }
  }, [user]);

  const handleLogin = () => {
    auth
      .signInWithEmailAndPassword(email, password)
      .then((userCredentials) => {
        const user = userCredentials.user;
        navigation.navigate('Index');
      })
      .catch((error) => {
        console.error(error);
        alert('Invalid email or password');
      });
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="height">
      <View style={styles.logoContainer}>
        <Image source={roundLogo} />
        <Image
          source={mainLogo}
          style={{
            marginTop: 42,
            width: 144,
          }}
        />
      </View>
      <View style={styles.formContainer}>
        <Text variant="h4">Email</Text>
        <TextInput
          value={email}
          onChangeText={(text) => setEmail(text)}
          style={styles.input}
        />
        <Text variant="h4">Password</Text>
        <TextInput
          value={password}
          onChangeText={(text) => setPassword(text)}
          style={styles.input}
          secureTextEntry
        />
        <Button
          variant="primaryLarge"
          onPress={handleLogin}
          alignSelf="center"
          marginTop={4}
        >
          Login
        </Button>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'baseline',
            marginTop: 10,
            alignSelf: 'center',
          }}
        >
          <Text variant="disclaimer" marginRight={2}>
            New on AmiGoes?{' '}
          </Text>

          <Link
            onPress={() => {
              navigation.navigate('Signup');
            }}
          >
            Create an Account
          </Link>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F8F8F8',
  },
  logoContainer: {
    alignItems: 'center',
    flex: 0.45,
    justifyContent: 'center',
    width: '100%',
  },
  formContainer: {
    flex: 0.55,
    marginLeft: 20,
    marginRight: 20,
  },
  input: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#C3C3C3',
    borderRadius: 6,
    marginBottom: 20,
    marginTop: 10,
  },
});

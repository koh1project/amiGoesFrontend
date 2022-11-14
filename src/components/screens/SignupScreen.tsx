import { useNavigation } from '@react-navigation/core';
import { Button, KeyboardAvoidingView, Link, Text, View } from 'native-base';
import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, TextInput } from 'react-native';
import mainLogo from '../../../assets/images/mainLogo.png';
import roundLogo from '../../../assets/images/roundLogo.png';
import { auth } from '../../utils/firebase';

const SignupScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        navigation.navigate('Index');
      }
    });
    return unsubscribe;
  }, []);

  const handleSignup = () => {
    if (password !== confirmPassword) {
      alert('Passwords do not match');
    } else {
      auth
        .createUserWithEmailAndPassword(email, password)
        .then((userCredentials) => {
          const user = userCredentials.user;
        })
        .catch((error) => alert(error.message));
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
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
        <Text variant="h4">Confirm Password</Text>
        <TextInput
          value={confirmPassword}
          onChangeText={(text) => setConfirmPassword(text)}
          style={styles.input}
          secureTextEntry
        />
        <Button
          variant="primaryLarge"
          onPress={handleSignup}
          alignSelf="center"
        >
          Sign up
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
            Already have an account?{' '}
          </Text>
          <Link
            onPress={() => {
              navigation.navigate('Login');
            }}
          >
            Log in
          </Link>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default SignupScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F8F8F8',
  },
  logoContainer: {
    alignItems: 'center',
    flex: 0.4,
    justifyContent: 'center',
    width: '100%',
  },
  formContainer: {
    flex: 0.6,
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

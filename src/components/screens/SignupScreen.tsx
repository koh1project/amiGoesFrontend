import { useNavigation } from '@react-navigation/core';
import { KeyboardAvoidingView } from 'native-base';
import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
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
      <View style={styles.inputContainer}>
        <Text style={styles.text}>Email</Text>
        <TextInput
          value={email}
          onChangeText={(text) => setEmail(text)}
          style={styles.input}
        />
        <Text style={styles.text}>Password</Text>
        <TextInput
          value={password}
          onChangeText={(text) => setPassword(text)}
          style={styles.input}
          secureTextEntry
        />
        <Text style={styles.text}>Confirm Password</Text>
        <TextInput
          value={confirmPassword}
          onChangeText={(text) => setConfirmPassword(text)}
          style={styles.input}
          secureTextEntry
        />
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={handleSignup} style={styles.button}>
          <Text style={styles.buttonText}>CREATE</Text>
        </TouchableOpacity>
        <View style={{ flexDirection: 'row' }}>
          <Text style={{ fontSize: 15, color: 'gray', marginTop: 5 }}>
            Already have an account?{' '}
          </Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('Login')}
            style={styles.buttonOutline}
          >
            <Text style={styles.buttonTextOutline}>Login</Text>
          </TouchableOpacity>
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
  },
  inputContainer: {
    width: '90%',
    marginBottom: 20,
  },
  text: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 2,
  },
  input: {
    padding: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 10,
    marginBottom: 20,
  },
  buttonContainer: {
    width: '90%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 5,
  },
  button: {
    backgroundColor: 'gray',
    width: '100%',
    padding: 10,
    borderRadius: 30,
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonOutline: {
    marginTop: 5,
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 20,
  },
  buttonTextOutline: {
    color: 'gray',
    fontWeight: '700',
    fontSize: 16,
    textDecorationLine: 'underline',
  },
});
